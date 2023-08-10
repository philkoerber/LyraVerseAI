import AuthForm from "./auth-form";

export default function Home() {
  return (
    <div className="w-screen h-screen flex">
      <div className="flex h-full gap-12 flex-col justify-center items-center w-1/2 p-8 bg-gray-500 bg-opacity-50 border-r-2 border-black">
        <div className="w-full max-w-[300px] flex justify-center items-center">
          <img src="./lyraverseai.svg" />
        </div>
        <div className="text-center text-sm md:text-lg lg:text-xl flex flex-col justify-center items-center">
          <p>Oh, mortal heart, with passions deep,</p>
          <p>Awaken from your gentle sleep,</p>
          <p>Embrace the call, the secrets keep,</p>
          <p>For in your hands, the treasures reap.</p>
        </div>

        <div className="flex justify-center items-center">
          <AuthForm />
        </div>
      </div>

      <div className="w-1/2 h-screen flex justify-center items-center">
        <img src="./logo.svg" />
      </div>
    </div>
  );
}
