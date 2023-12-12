import React from "react";
import { useState } from "react";
import PrimaryButton from "@/buttons/primarybutton/PrimaryButton";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className=" min-h-screen">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900">Contact Us</h2>
          <p className="mt-4 text-gray-500">
            Fill out the form below to send us a message and we'll get back to
            you as soon as possible.
          </p>
          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Message
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  ></textarea>
                </div>
              </div>
              <div className="text-center">
                <PrimaryButton>Submit</PrimaryButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
