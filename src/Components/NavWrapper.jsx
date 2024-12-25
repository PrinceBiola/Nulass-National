import React from 'react'
import Nav from './Nav/Nav'
import Footer from './Footer/Footer'

export default function NavWrapper({ children }) {
  return (
    <>
      <Nav />
        {children}
      <Footer />
    </>
  )
}
