import React from 'react'
import HeroSection from "../../components/HeroSection/HeroSection"
import AboutUs from '../../components/AboutUs/AboutUs'
import DonationSection from '../../components/DonationSection/DonationSection'

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <AboutUs/>
      <DonationSection/>
    </div>
  )
}

export default Home
