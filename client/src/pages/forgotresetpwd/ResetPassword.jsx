import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import PrimaryButton from "../../components/buttons/primarybutton/PrimaryButton";
import { useAuth } from "../../context/AuthContext";
import useQuery from "../../hooks/useQuery";
import { useToast } from "@chakra-ui/react";

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const query = useQuery();
  const oobCode = query.get("oobCode");
  const navigate = useNavigate();
  const toast = useToast();
  const handleResetPassword = (values, actions) => {
    resetPassword(oobCode, values.email)
      .then(() => {
        console.log("password reset");
        toast({
          description: "Your password has been reset",
          position: "bottom-left",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          description: error.message,
          position: "bottom-left",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
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
      password: "",
      confirmPassword: "",
    },
    onSubmit: handleResetPassword,
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form onSubmit={handleSubmit}>
          <h4 className="mb-2 text-xl font-medium text-gray-900 dark:text-white">
            Reset your password
          </h4>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your password
            </label>
            <input
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className={`mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
                touched.password && errors.password
                  ? "focus:ring-red-500 focus:border-red-500 border-red-500"
                  : "focus:ring-blue-500 focus:border-blue-500"
              }`}
            />
            {touched.password && errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Retype your password
            </label>
            <input
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="••••••••"
              className={`mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
                touched.confirmPassword && errors.confirmPassword
                  ? "focus:ring-red-500 focus:border-red-500 border-red-500"
                  : "focus:ring-blue-500 focus:border-blue-500"
              }`}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <div className="text-red-500 text-sm">
                {errors.confirmPassword}
              </div>
            )}
          </div>
          <PrimaryButton className="w-full" type="submit">
            Reset Password
          </PrimaryButton>
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
              Login to you account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
