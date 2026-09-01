import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/home/Hero'
import Intro from '@/components/home/Intro'
import GrowthTree from '@/components/home/GrowthTree'
import HeroUnified from '@/components/home/HeroUnified'
import DataPipelineSection from '@/components/home/DataPipelineSection'
import { Landmark, Building2, HardHat, Sprout, Briefcase, Tractor } from 'lucide-react'
import NationalProgram from '@/components/home/NationalProgram'
import CorporateSolutions from '@/components/home/CorporateSolutions'
import Technology from '@/components/home/Technology'

//import ScaleBand from '@/components/home/ScaleBand'

import Impact from '@/components/home/Impact'
import Partners from '@/components/home/Partners'
import CTA from '@/components/home/CTA'
//import SmartFarmScaleSection from '@/components/home/SmartBrandScale'

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero
          eyebrow="Real-time Insights"
          headline={
            <>
              <span>Satellite</span>
              <br />
              <span className="text-emerald-400">Intelligence</span>
            </>
          }
          description="Monitor crop health, soil moisture and weather with AI-powered satellite analytics."
          primaryCta={{ label: "Explore the Platform", href: "/platform" }}
          secondaryCta={{ label: "See How It Works", href: "/how" }}
          videoSrcMp4="/videos/WhatsApp Video 2026-08-25 at 4.53.30 PM.mp4"
          videoSrcWebm="/videos/hero.webm"
          posterSrc="/img/hero-poster.jpg"
          enableVideoOnMobile={true}
        />
        <Intro />
        <DataPipelineSection />
        <HeroUnified />
        
        <NationalProgram />
        <CorporateSolutions />
        <Technology />
        {/* <ScaleBand /> */}
        {/* <SmartFarmScaleSection /> */}

        <Impact />
        <Partners />
        <CTA />
      </main>
      
    </>
  )
}
