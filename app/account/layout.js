import Header from "./Header";

export default function RootLayout({ children }) {
  return (
    <div>
      <Header />

      <div className="-z-10 absolute w-screen flex justify-center items-center mt-20">
        <img className="opacity-[4%]" src="/logo.svg" />
      </div>

      {children}
    </div>
  );
}
