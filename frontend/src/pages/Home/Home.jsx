import HeroSection from "../../components/HeroSection/HeroSection"
import AboutUs from '../../components/AboutUs/AboutUs'
import DonationSection from '../../components/DonationSection/DonationSection'
import AdoptionRequirements from '../../components/AdoptionRequirements/AdoptionRequirements'

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <div id="about-us">
        <AboutUs />
      </div>
      <DonationSection />
      <div id="adoption-section">
        <AdoptionRequirements />
      </div>
    </div>
  )
}

export default Home
