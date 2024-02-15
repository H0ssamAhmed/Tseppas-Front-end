import SingPage from "../../../_components/SingPage";
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <SingPage imagaURl="https://res.cloudinary.com/dc5eb9lmi/image/upload/v1706193507/small_3_e5af7bbc21.jpg" />

          <main className="flex items-center justify-center lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className=" w-full h-full flex flex-col items-center justify-center mt-8">
              <h2 className="my-6 lg:hidden text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to Tseppas
              </h2>

              <SignUp />
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
