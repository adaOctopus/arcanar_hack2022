import React from 'react';
import '../../App.css';
import Cards from '../UI/LandingUI/Cards';
import HeroSection from '../UI/LandingUI/HeroSection';
import Footer from '../UI/LandingUI/Footer';
import HowToUseSection from '../UI/LandingUI/HowToUseSection';
import CardAnatomy from '../UI/TokenCard/CardAnatomy';
import RoadmapScreen from '../UI/ProductRoadmap/RoadmapScreen';
import WhyPolygon from '../UI/PolygonNetwork/WhyPolygon';
import ValueProposition from '../UI/ValueProposition/ValueProposition';

function Home() {
  return (
    <>
      <HeroSection />
      <ValueProposition/>
      <CardAnatomy/>
      <WhyPolygon/>
      {/* <Cards /> */}
      <RoadmapScreen/>
      <HowToUseSection/>
      <Footer />
    </>
  );
}

export default Home;
