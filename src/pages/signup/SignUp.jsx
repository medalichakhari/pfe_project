import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import PrimaryButton from "@/buttons/primarybutton/PrimaryButton";
import SecondaryButton from "@/buttons/secondarybutton/SecondaryButton";
import { useAuth } from "../../context/AuthContext";
import GoogleIcon from "../../assets/svg/GoogleIcon";
import { signUpSchema } from "../../utils/validationSchemas";
import { useTranslation } from "react-i18next";
import Slogan from "../../assets/svg/Slogan";

const SignUp = () => {
  const { t } = useTranslation();
  const { signUpWithEmailAndPwd } = useAuth();
  const { googleSignUp } = useAuth();
  const navigate = useNavigate();
  const hundleSignUp = (values, actions) => {
    signUpWithEmailAndPwd(values.email, values.password)
      .then(() => {
        navigate("/userAccount");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSignUpWithGoogle = () => {
    googleSignUp()
      .then(() => {
        navigate("/useraccount");
      })
      .catch((error) => {
        console.log(error);
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
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: hundleSignUp,
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="mb-4 flex justify-center items-center ">
          <Slogan className="h-6" />
        </div>
        <form onSubmit={handleSubmit}>
          <h4 className="mb-2 text-xl font-medium text-gray-900 dark:text-white">
            {t("signUp.ourPlatform")}
          </h4>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {t("signUp.email")}
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
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {t("signUp.password")}
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
              {t("signUp.confirmPassword")}
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
            {t("signUp.signUp")}
          </PrimaryButton>
          <div className="flex items-center justify-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            <div className="px-2 text-gray-500 dark:text-gray-300">or</div>
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <SecondaryButton
            type="button"
            className="w-full"
            onClick={handleSignUpWithGoogle}
          >
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600">
                <GoogleIcon />
              </div>
              <span className="ml-2">{t("signUp.googleSignUp")}</span>
            </div>
          </SecondaryButton>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            {t("signUp.registered")}
            <a
              href="/signin"
              className="text-secondary hover:underline dark:text-primary"
            >
              {t("signUp.login")}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
