import { 
  errMsg,
  errorResponse 
} from '../utils/response';

const validateInput = (req, res, next) => {
  const { rule, data} = req.body;

  if(!rule){
    return errMsg(res, "rule is required.");
  };

  if(!data){
    return errMsg(res, "data is required.");
  };

  if(!rule.field){
    return errMsg(res, "field is required.")
  };

  if(typeof(rule.field) !== 'string'){
    return errMsg(res, "field should be a string");
  }

  if(rule.field.split('.').length > 3){
    return errMsg(res, "field should not be more than two nesting levels.")
  }

  if(!rule.condition){
    return errMsg(res, "condition is required.")
  };

  const acceptedConditions = ["eq", "neq", "gt", "gte", "contains"];
  if(!acceptedConditions.includes(rule.condition)){
    return errMsg(res, "condition can only be either of ['eq', 'neq', 'gt', 'gte' or 'contains].");
  }

  if(!rule.condition_value){
    return errMsg(res, "condition_value is required.")
  };

  if(typeof(rule) !== 'object'){
    return errMsg(res, "rule should be an object.");
  };

  //data can only be JSON, Array or String
  const allowedDataTypes = ['object', 'string'];

  if(!allowedDataTypes.includes(typeof(data))){
    return errMsg(res, "data should be an object or a string.");
  };

  //if data is a string
  if(typeof(data) === 'string' && data !== rule.field){
    return errorResponse(res, rule, rule.field, data.split('')[0])
  }

  //check if data is an object
  const isObject = typeof(data) === 'object';
  //check if data object is a plain object or an Array
  const isArray = Array.isArray(data);

  //if it is an Array and rule.field isn't included in the array
  // if(isObject && isArray && !data.includes(rule.field)){
  //   return errMsg(res, `field ${rule.field} is missing from data.`)
  // };

  //if data is an Array
  if(isObject && isArray){
    return errMsg(res, `field ${rule.field} is missing from data.`)
  };

  //if its not an Array and rule.field isn't included in the keys
  if(isObject && !isArray && rule.field.split('.').length === 1 && !Object.keys(data).includes(rule.field)){
    return errMsg(res, `field ${rule.field} is missing from data.`)
  };

  /* if plain object & array of fieldSplit is greater than 1, 
    check if fieldSplit[0] exist in data and if fieldSplit[1] exist in fieldSplit[0] 
    otherwise throw error 
  */
  if(isObject && !isArray && rule.field.split('.').length > 1){
    let checkArray = [];
    for(let i=1; i< rule.field.split('.').length; i++){
      const next = (rule.field.split('.')[i]);
      // console.log('next', next)
      const check = rule.field.split('.')[i-1];
      checkArray.push(check)
      // console.log('check', check);
      // console.log(checkArray);
      
      if(checkArray.length === 1 && !Object.keys(data[checkArray[0]]).includes(next)){
        // console.log(checkArray[0]);
        return errMsg(res, `field ${next} is missing from data.`)
      };

      if(checkArray.length === 2 && !Object.keys(data[checkArray[0]][checkArray[1]]).includes(next)){
        // console.log(checkArray[1]);
        return errMsg(res, `field ${next} is missing from data.`)
      };
    }
  };

  next();
};

export default validateInput;