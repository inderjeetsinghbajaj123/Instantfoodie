import Navbar from "../../components/Navbar";
import PromoCarousel from "../../components/Promo";
import CategorySection from "../../components/CategorySection";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";

const Home = () => {
  const { cartCount } = useCart();

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col antialiased">
      <Navbar cartCount={cartCount} />
      <PromoCarousel />
      <CategorySection />
      <Footer />
    </div>
  );
};

export default Home;
