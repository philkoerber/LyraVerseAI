import Header from "./Header"

export default function RootLayout({ children }) {
  return (
          <div>
              <Header />
              {children}
          </div>
  )
}
