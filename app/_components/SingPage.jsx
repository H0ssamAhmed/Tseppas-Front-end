import Image from "next/image";
import React from "react";

const SingPage = ({ imagaURl }) => {
  return (
    <section className="relative hidden md:flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
      <Image
        alt=" "
        src={imagaURl}
        width={55550}
        height={55550}
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />

      <div className="hidden lg:relative lg:block lg:p-12">
        <Image alt="logo" src="/logo-color.png" width={200} height={200} />

        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Welcome to Tseppas
        </h2>

        <p className="mt-4 leading-relaxed text-white/90">
          Find a source of happiness in every piece you eat.
        </p>
      </div>
    </section>
  );
};

export default SingPage;
