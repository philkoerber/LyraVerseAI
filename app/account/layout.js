import Header from "./Header";

export default function RootLayout({ children }) {
  return (
    <div>
      <Header />

      <div className="-z-10 absolute w-screen h-[80vh] flex justify-center items-center">
        <img className="opacity-[4%] h-[80vh]" src="/logo.svg" />
      </div>

      <div className="p-8">{children}</div>
    </div>
  );
}
