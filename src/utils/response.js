const errMsg = (res, msg)=>{
  return res
  .status(400)
  .json({
    message: msg,
    status: "error",
    data: null
  });
};

const successResponse = (res, {condition, condition_value}, field, fieldValue) => {
  return res
  .status(200)
  .json({
    message: `field ${field} successfully validated.`,
    status: "success",
    data: {
      validation: {
        error: "false",
        field,
        fieldValue,
        condition,
        condition_value
      }
    }
  })
};

const errorResponse = (res, {condition, condition_value}, field, fieldValue) => {
  return res
  .status(400)
  .json({
    message: `field ${field} failed validation.`,
    status: "error",
    data: {
      validation: {
        error: "true",
        field,
        fieldValue,
        condition,
        condition_value
      }
    }
  })
};

export {
  errMsg,
  successResponse,
  errorResponse
}