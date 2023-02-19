import React from "react";

const Hero = () => {
  return (
    <section class="relative px-6 lg:px-8">
      <div className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-13 sm:py-10 lg:py-16">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">Find your</span>{" "}
              <span className="block text-secondary xl:inline">dream job</span>
            </h1>
            <p class="mt-6 text-lg leading-8 text-gray-600">
              Browse through thousands of job listings and apply to the ones
              that match your skills and experience, or post your own job
              listing to attract qualified candidates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
