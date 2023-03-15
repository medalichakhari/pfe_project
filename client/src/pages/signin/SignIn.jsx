import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import PrimaryButton from "../../components/buttons/primarybutton/index";
import SecondaryButton from "../../components/buttons/secondarybutton";
import { useAuth } from "../../context/AuthContext";
import GoogleIcon from "../../assets/svg/GoogleIcon";

const SignIn = () => {
  const { signInWithEmailAndPwd } = useAuth();
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const handleSignIn = (data) => {
    signInWithEmailAndPwd(data.email, data.password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSignInWithGoogle = () => {
    googleSignIn()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
          <h4 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign in to our platform
          </h4>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              {...register("email")}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              {...register("password")}
            />
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
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="ml-auto text-sm text-secondary hover:underline dark:text-primary"
            >
              Lost Password?
            </a>
          </div>
          <PrimaryButton className="w-full">
            Login to your account
          </PrimaryButton>
          <div className="flex items-center justify-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            <div className="px-2 text-gray-500 dark:text-gray-300">or</div>
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <SecondaryButton className="w-full" onClick={handleSignInWithGoogle}>
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600">
                <GoogleIcon />
              </div>
              <span className="ml-2">Login with Google</span>
            </div>
          </SecondaryButton>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{" "}
            <a
              href="/signup"
              className="text-secondary hover:underline dark:text-primary"
            >
              Create account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
