import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import PrimaryButton from "@/buttons/primarybutton/PrimaryButton";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "@chakra-ui/react";
import Slogan from "../../assets/svg/Slogan";

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const handleForgotPassword = async (values, actions) => {
    try {
      await forgotPassword(values.email);
      console.log("email sent");
      navigate("/signin");
      toast({
        description: "Email sent.",
        position: "bottom-left",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        description: error.message,
        position: "bottom-left",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: handleForgotPassword,
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="mb-4 flex justify-center items-center ">
          <Slogan className="h-6" />
        </div>
        <form onSubmit={handleSubmit}>
          <h4 className="mb-2 text-xl font-medium text-gray-900 dark:text-white">
            Forgot password
          </h4>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              type="email"
              name="email"
              id="email"
              placeholder="name@company.com"
              className={`mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
                touched.email && errors.email
                  ? "focus:ring-red-500 focus:border-red-500 border-red-500"
                  : "focus:ring-blue-500 focus:border-blue-500"
              }`}
            />
            {touched.email && errors.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
          </div>
          <PrimaryButton className="w-full" type="submit">
            Send reset link
          </PrimaryButton>
        </form>
        <div className="flex items-center justify-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          <div className="px-2 text-gray-500 dark:text-gray-300">or</div>
          <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
        </div>
        <div className="flex justify-center">
          <a
            href="/signin"
            className="text-secondary hover:underline dark:text-primary"
          >
            Login to your account
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
