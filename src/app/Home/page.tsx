import CategoryPreview from "@/components/CategoryPreview"
import FeaturedCategories from "@/components/FeaturedCategory"
import Hero from "@/components/Hero"
import ServicesCards from "@/components/ServiceCard"
import Slider from "@/components/Slider"
import AboutPage from "../about/page"

const Home = () => {
  return (
    <div>
    <>
    {/* <CategoryPreview/> */}
    <Hero/>
    <Slider/>
    <AboutPage/>
    </>
    </div>
  )
}

export default Home