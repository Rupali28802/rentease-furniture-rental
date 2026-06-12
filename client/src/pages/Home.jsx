import ShopByCategory from "../components/home/Categories";
import Features from "../components/home/Features";
import Hero from "../components/home/Hero";
import OfferBanner from "../components/home/OfferBanner";
import ProductSection from "../components/home/ProductSection";

const Home = () => {
  return (
    <div>
      <Hero />
      <ShopByCategory/>
      <ProductSection/>
      <OfferBanner/>
      <Features/>
    </div>
  );
};

export default Home;
