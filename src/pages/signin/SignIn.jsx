import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import PrimaryButton from "@/buttons/primarybutton/PrimaryButton";
import SecondaryButton from "@/buttons/secondarybutton/SecondaryButton";
import { useAuth } from "../../context/AuthContext";
import GoogleIcon from "../../assets/svg/GoogleIcon";
import { signInSchema } from "../../utils/validationSchemas";
import { useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Slogan from "../../assets/svg/Slogan";

const SignIn = () => {
  const { t } = useTranslation();
  const { signInWithEmailAndPwd, googleSignIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const from = location.state?.from?.pathname || "/";
  const handleSignIn = (values) => {
    signInWithEmailAndPwd(values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          user.getIdTokenResult()
            .then((idTokenResult) => {
              const customClaims = idTokenResult.claims;
              if (customClaims.roles && customClaims.roles.includes("user")) {
                navigate("/");
              } else {
                navigate("/profile");
              }
              toast({
                description: "Logged In.",
                position: "bottom-left",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            })
            .catch((error) => {
              console.log("Error fetching custom claims:", error);
            });
        }
      })
      .catch((error) => {
        toast({
          description: error.message,
          position: "bottom-left",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        console.log(error);
      });
  };
  
  const handleSignInWithGoogle = () => {
    googleSignIn()
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          user.getIdTokenResult()
            .then((idTokenResult) => {
              const customClaims = idTokenResult.claims;
              if (customClaims.roles && customClaims.roles.includes("user")) {
                navigate("/");
              } else {
                navigate("/profile");
              }
              toast({
                description: "Logged In.",
                position: "bottom-left",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            })
            .catch((error) => {
              console.log("Error fetching custom claims:", error);
            });
        }
      })
      .catch((error) => {
        toast({
          description: error.message,
          position: "bottom-left",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
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
    },
    validationSchema: signInSchema,
    onSubmit: handleSignIn,
  });
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="mb-4 flex justify-center items-center ">
          <Slogan className="h-6" />
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <h4 className="text-xl font-medium text-gray-900 dark:text-white">
            {t("signIn.ourPlatform")}
          </h4>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {t("signIn.email")}
            </label>
            <input
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              type="email"
              name="email"
              id="email"
              placeholder="name@company.com"
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
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
              {t("signIn.password")}
            </label>
            <input
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
                touched.password && errors.password
                  ? "focus:ring-red-500 focus:border-red-500 border-red-500"
                  : "focus:ring-blue-500 focus:border-blue-500"
              }`}
            />
            {touched.password && errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
          </div>
          <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                />
              </div>
              <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                {t("signIn.rememberMe")}
              </label>
            </div>
            <a
              href="/forgotpassword"
              className="ml-auto text-sm text-secondary hover:underline dark:text-primary"
            >
              {t("signIn.forgotPassword")}
            </a>
          </div>
          <PrimaryButton className="w-full">{t("signIn.signIn")}</PrimaryButton>
          <div className="flex items-center justify-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            <div className="px-2 text-gray-500 dark:text-gray-300">or</div>
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <SecondaryButton
            type="button"
            className="w-full"
            onClick={handleSignInWithGoogle}
          >
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600">
                <GoogleIcon />
              </div>
              <span className="ml-2">{t("signIn.googleSignIn")}</span>
            </div>
          </SecondaryButton>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            {t("signIn.notRegistered")}
            <a
              href="/signup"
              className="text-secondary hover:underline dark:text-primary"
            >
              {t("signIn.signUp")}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
