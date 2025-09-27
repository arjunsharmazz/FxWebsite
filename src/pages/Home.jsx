import React from "react";
import Hero from "../componenets/Hero.jsx";
import KeyFeatures from "../componenets/KeyFeatures.jsx";
import MarketTicker from "../componenets/MarketTicker.jsx";
import FaqSection from "../componenets/FaqSection.jsx";
import NewsletterSection from "../componenets/NewsletterSection.jsx";
import TradeSimulator from "../componenets/TradeSimulator.jsx";
import SecurityHighlights from "../componenets/SecurityHighlights.jsx";
import CTABanner from "../componenets/CTABanner.jsx";
import TradingPlatforms from "../componenets/TradingPlatforms.jsx";
import EducationResources from "../componenets/EducationResources.jsx";
import Two from "../componenets/Two.jsx";
import AboutSection from "../componenets/AboutSection.jsx";
import ProtectionSection from "../componenets/ProtectionSection.jsx";
import AnytimeSection from "../componenets/AnytimeSection.jsx";
import StepsSection from "../componenets/StepsSection.jsx";
import NetworkSection from "../componenets/NetworkSection.jsx";
import TradeSection from "../componenets/TradeSection.jsx";
import Paymentslogo from "../componenets/Paymentslogo.js";
import SupportSection from "../animcomponents/SupportSection.jsx";


const Home = () => {
  return (
    <>
      <Hero />  
      <AnytimeSection />
      <MarketTicker />
      <KeyFeatures />
      <Two />
      <TradingPlatforms />
      <NetworkSection />
      <TradeSimulator />
      <ProtectionSection />
      <SecurityHighlights />
      <StepsSection />
      <TradeSection />
      <Paymentslogo />
      <FaqSection />
      <AboutSection />
      <EducationResources />
      {/* <SupportSection /> */}
      <NewsletterSection />
      <CTABanner />
    </>
  );
};

export default Home;
