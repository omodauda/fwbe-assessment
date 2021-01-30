import {
  successResponse,
  errorResponse
} from '../utils/response';

const baseUrl = (req, res) => {
  const data = {
    name: "Lawal Dauda",
    github: "@omodauda",
    email: "omodauda.dl@gmail.com",
    mobile: "08141637335"
  };

  return res
  .json({
    message: "My Rule-Validation API",
    status: "success",
    data
  });
};

const validationUrl = (req, res) => {
  const { rule, data} = req.body;
  const {field, condition, condition_value} = rule;
  const split = field.split('.');

  let fieldValue;

  //handle data nesting
  if(split.length === 1){
    fieldValue = data[split[0]];
  };
  if(split.length === 2){
    fieldValue = data[split[0]][split[1]];
  };
  if(split.length === 3){
    fieldValue = data[split[0]][split[1]][split[2]];
  };
    
  //validate conditions
  if(condition === "eq"){
    fieldValue === condition_value ? successResponse(res, rule, field, fieldValue) : errorResponse(res, rule, field, fieldValue);
  };

  if(condition === "neq"){
    fieldValue !== condition_value ? successResponse(res, rule, field, fieldValue) : errorResponse(res, rule, field, fieldValue);
  };

  if(condition === "gt"){
    if(typeof(condition_value) !== typeof(fieldValue) || typeof(condition_value) === 'string'){
      return errorResponse(res, rule, field, fieldValue)
    }
    condition_value > fieldValue ? successResponse(res, rule, field, fieldValue) : errorResponse(res, rule, field, fieldValue);
  };

  if(condition === "gte"){
    if(typeof(condition_value) !== typeof(fieldValue) || typeof(condition_value) === 'string'){
      return errorResponse(res, rule, field, fieldValue)
    }
    condition_value >= fieldValue ? successResponse(res, rule, field, fieldValue) : errorResponse(res, rule, field, fieldValue);
  };

  if(condition === "contains"){
    if(!Array.isArray(fieldValue)){
      return errorResponse(res, rule, field, fieldValue);
    }
    fieldValue.includes(condition_value) ? successResponse(res, rule, field, fieldValue) : errorResponse(res, rule, field, fieldValue);
  };

};

export {
  baseUrl,
  validationUrl
}