import React from "react";

const Hero = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-24 lg:flex ">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Signature line of oriental desserts
            <strong className="font-extrabold sm:block text-primary">
              Find a source of happiness in every piece you eat.
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Combining the delicious French pastry quality along with highly
            demanded Middle Eastern Oriental desserts
          </p>

          {/* <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-secondary focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="/get-started"
            >
              Get Started
            </a>

            <a
              className="block w-full rounded px-12 py-3 text-sm font-medium text-primary shadow hover:secondary focus:outline-none focus:ring  sm:w-auto"
              href="/about"
            >
              Learn More
            </a>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
