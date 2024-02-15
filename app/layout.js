"use client"
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './_components/Header'
import { ThemeProvider } from '../components/providers/theme-provider'
import { ClerkProvider } from '@clerk/nextjs'
import Footer from '../app/_components/Footer'
import { CartContext } from './_context/CartContext'
import { useState } from 'react'
const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Tseppas',
//   description: 'Signature line of oriental desserts and letting history take its course. We succeeded in combining the delicious French pastry quality along with highly demanded Middle Eastern Oriental desserts mastering the best of both worlds.',
//   icons: '/logo-color.png',
//   noIndex: false,
// }

export default function RootLayout({ children }) {
  const [cart, setCart] = useState([])
  return (

    <ClerkProvider>
      <CartContext.Provider value={{ cart, setCart }}>

        <html lang="en" suppressHydrationWarning>
          <body className={inter.className + "bg-gray-50 dark:bg-[#111827]"}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              {children}
              <Footer />

            </ThemeProvider>
          </body>
        </html>
      </CartContext.Provider>
    </ClerkProvider>

  )
}
