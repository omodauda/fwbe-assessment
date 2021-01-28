import {
  successResponse,
  errorResponse
} from '../utils/response';

const baseUrl = (req, res) => {
  const data = {
    name: "Lawal Dauda",
    github: "@omodauda",
    email: "omodauda.dl@gmail.com",
    mobile: "08141637335",
    twitter: "@iam_babslaw"
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
  // console.log(split);

  let fieldValue;

  if(split.length === 1){
    fieldValue = data[split[0]];
    
    if(condition === "eq"){
      data[split[0]] === condition_value ? successResponse(res, rule, field, fieldValue) : errorResponse(res, rule, field, fieldValue);
    };
    if(condition === "neq"){
      data[split[0]] !== condition_value ? successResponse(res, rule, field, fieldValue) : errorResponse(res, rule, field, fieldValue);
    };
    if(condition === "gt"){
      condition_value > data[split[0]] ? successResponse(res, rule, field, fieldValue) : errorResponse(res, rule, field, fieldValue);
    }
    if(condition === "gte"){
      condition_value >= data[split[0]] ? successResponse(res, rule, field, fieldValue) : errorResponse(res, rule, field, fieldValue);
    }
    if(condition === "contains"){
      data[split[0]].includes(condition_value) ? successResponse(res, rule, field, fieldValue) : errorResponse(res, rule, field, fieldValue);
    }
  };

  if(split.length === 2){
    fieldValue = data[split[0]][split[1]];
    if(condition === "eq"){
      data[split[0]][split[1]] === condition_value ? successResponse(res, rule, field, fieldValue) : errorResponse(res, rule, field, fieldValue);
    };
    if(condition === "neq"){
      data[split[0]][split[1]] !== condition_value ? successResponse(res, rule, field, fieldValue) : errorResponse(res, rule, field, fieldValue);
    };
    if(condition === "gt"){
      condition_value > data[split[0]][split[1]] ? successResponse(res, rule, field, fieldValue) : errorResponse(res, rule, field, fieldValue);
    };
    if(condition === "gte"){
      condition_value >= data[split[0]][split[1]] ? successResponse(res, rule, field, fieldValue) : errorResponse(res, rule, field, fieldValue);
    };
    if(condition === "contains"){
      data[split[0]][split[1]].includes(condition_value) ? successResponse(res, rule, field, fieldValue) : errorResponse(res, rule, field, fieldValue);
    };
  };

  if(split.length === 3){
    fieldValue = data[split[0]][split[1]][split[2]];
    if(condition === "eq"){
      data[split[0]][split[1]][split[2]] === condition_value ? successResponse(res, rule, field, fieldValue) : errorResponse(res, rule, field, fieldValue);
    };
    if(condition === "neq"){
      data[split[0]][split[1]][split[2]] !== condition_value ? successResponse(res, rule, field, fieldValue) : errorResponse(res, rule, field, fieldValue);
    };
    if(condition === "gt"){
      condition_value > data[split[0]][split[1]][split[2]] ? successResponse(res, rule, field, fieldValue) : errorResponse(res, rule, field, fieldValue);
    };
    if(condition === "gte"){
      condition_value >= data[split[0]][split[1]][split[2]] ? successResponse(res, rule, field, fieldValue) : errorResponse(res, rule, field, fieldValue);
    };
    if(condition === "contains"){
      data[split[0]][split[1]][split[2]].includes(condition_value) ? successResponse(res, rule, field, fieldValue) : errorResponse(res, rule, field, fieldValue);
    };
  }
  
};

export {
  baseUrl,
  validationUrl
}