import Footer from '@/components/Footer'
import HomeHero from '@/components/Hero'
import Layout from '@/components/Layout'
import Navbar from '@/components/Navbar'
import Transition from '@/components/Transition'

export default function Home() {
  return (
    <>
      <Transition />
      <Navbar />
        <HomeHero />
      <Footer />
    </>
  )
}