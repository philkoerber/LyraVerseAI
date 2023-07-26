import Header from "./Header"

export default function RootLayout({ children }) {
  return (
    <html>
          <body>
              <Header />
              {children}
          </body>
    </html>
  )
}
