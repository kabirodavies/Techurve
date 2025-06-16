import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import ProductGrid from "@/components/ProductGrid";

const Home = () => {
  return (
    <Container className="bg-shop-light-pink">
      <HomeBanner />
      <ProductGrid />
    </Container>
  );
};

export default Home;
