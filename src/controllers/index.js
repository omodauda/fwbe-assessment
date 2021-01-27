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
}

export {
  baseUrl
}