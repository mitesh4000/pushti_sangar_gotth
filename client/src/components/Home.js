import React from "react";
import Category from "./Category";
import FeatureCategory from "./FeatureCategory";
import Featured from "./Featured";
import Header from "./Header";
import HomeSlider from "./HomeSlider";
import MidFooter from "./MidFooter";

import MobileSidebar from "./MobileSidebar";
import NewArrival from "./NewArrival";
import OfferPart from "./OfferPart";
import SeasonalProducts from "./SeasonalProducts";
import Shringar from "./Shringar";
import Subscribe from "./Subscribe";
import TopProducts from "./TopProducts";
import Vastra from "./Vastra";
import Deals_Of_the_day from "./Deals_Of_the_day";
import { SignState } from "../contextAPI/State/SignState";

const Home = () => {
  return (
    <div>
      <Header />

      <MobileSidebar />
      <HomeSlider />
      {/* <FeatureCategory/> */}
      <Category />
      <OfferPart />
      <NewArrival />
      <Deals_Of_the_day />
      {/* <SeasonalProducts/> */}
      <Vastra />
      <Shringar />
      <TopProducts />
      <Subscribe />
      <Featured />
      <MidFooter />
    </div>
  );
};

export default Home;
