import React from "react"
import { Form, Formik } from "formik";
import CustomInput from "../../components/custominput/CustomInput";
import { advancedSchema } from "../../utils/validationSchemas";
import PrimaryButton from "../buttons/PrimaryButton";

const UserForm = () => {
  return (
    <Formik
      initialValues={{ username: ""}}
      validationSchema={advancedSchema}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {({ isSubmitting }) => (
        <Form >
          <CustomInput
            label="Username"
            name="username"
            type="text"
            placeholder="Enter your username"
          />
        <PrimaryButton type="submit">Submit</PrimaryButton>
        </Form>
      )}
    </Formik>
  )
}

export default UserForm;