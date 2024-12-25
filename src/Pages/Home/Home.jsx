import React from 'react'
import Nav from '../../Components/Nav/Nav'
import Hero from '../../Components/Hero/Hero'
import Footer from '../../Components/Footer/Footer'
import About from '../../Components/About/About'
import Features from '../../Components/Features/Features'
import Event from '../../Components/Event/Event'
import Testimonial from '../../Components/Testimonial/Testimonial'
import Blog from '../../Components/Blog/Blog'
import Member from '../../Components/Member/Member'

export default function Home() {
  return (
    <>
    <Nav />
    <Hero/>
    <About/>
    <Features/>
    <Event/>
    <Testimonial/>
    <Blog/>
    <Member/>
    <Footer/>
    
      
    </>
  )
}
