import './globals.css'
import { Ysabeau } from 'next/font/google'

const ysabeau = Ysabeau({ subsets: ['latin'] })

export const metadata = {
  title: 'LyraVerseAI',
  description: 'Inspire or be insprired',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ysabeau.className}>{children}</body>
    </html>
  )
}
