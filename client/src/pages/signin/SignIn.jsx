import React from "react";
// import { GoogleLogin } from 'react-google-login';
import { useForm } from "react-hook-form";
// import { LockClosedIcon } from '@heroicons/react/solid';

function SignIn() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div className="min-h-screen bg-blue-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md">
        <div className="text-center">
          {/* <LockClosedIcon className="h-8 w-8 mx-auto text-blue-500" /> */}
          <h2 className="mt-2 text-2xl font-bold text-gray-900">Sign In</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              {...register("email")}
            />
          </div>
          <div className="my-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              {...register("password")}
            />
          </div>
          <div className="my-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            >
              Sign In
            </button>
          </div>
          {/* <div className="my-4">
            <GoogleLogin
              clientId="YOUR_CLIENT_ID"
              buttonText="Sign In with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
            />
          </div> */}
        </form>
      </div>
    </div>
  );
}

export default SignIn;
