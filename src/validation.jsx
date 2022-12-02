import * as yup from "yup";
const mobileRules =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const today = new Date();
const validateSchema = yup.object().shape({
  fullName: yup.string().required("Name is required "),
  ObjectType: yup.string().required("Object is required"),
  BirthDay: yup.date().max(today).required("BirthDay is required"),
  gender: yup.string().required("Gender is required"),
  nationality: yup.string().required("Nationality is required"),
  nationId: yup.string().required("ID is required"),
  Address: yup.string().required("Address is required "),
  Email: yup
    .string()
    .email("Email is not valid")
    .required("Email is required "),
  Mobile: yup
    .string()
    .matches(mobileRules, "mobie phone is not valid")
    .required("Mobile Phone is required "),
  Province: yup.string().required("Province is required"),
  District: yup.string().required("District is required"),
});

export default validateSchema;
