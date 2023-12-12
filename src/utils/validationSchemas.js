import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const signUpSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

export const signInSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
});

export const userSchema = yup.object().shape({
  fName: yup.string().required('First name is required'),
  lName: yup.string().required('Last name is required'),
  birthDate: yup.date().required('Birth date is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  // country: yup.string().required('Country is required'),
  
  address: yup.string().required('Address is required'),
});

export const jobOfferSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  address: yup.string().required('Address is required'),
  type: yup.string().required('Type is required'),
  domain: yup.string().required('Domain is required'),
  salary: yup.number().required('Salary is required').positive('Salary must be a positive number'),
  experience: yup.string().required('Experience is required'),
  educationLevel: yup.string().required('Education level is required'),
}); 
export const candidatSchema = yup.object().shape({
  educationLevel: yup.string().required("Education level is required !"),
  speciality: yup.string().required("Speciality is required !"),
  experience: yup.string().required("Years of experience is required !"),
});

export const companySchema = yup.object().shape({
  companyName: yup.string().required("Company name is required !"),
  companyAddress: yup.string().required("Company address is required !"),
  companyActivity: yup.string().required("Activity area is required !"),
  //companyDescription: yup.string().required("Company description is required !"),
});
