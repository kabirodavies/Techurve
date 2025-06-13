import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import React from "react";

const Home = () => {
  return (
    <Container className="bg-shop-light-pink">
      <h2 className="text-xl font-semibold">Home</h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur
        sapiente obcaecati error ut ducimus debitis harum iste similique
        voluptates. Neque dolor eveniet beatae autem dignissimos quod quae,
        velit omnis aperiam cumque ratione dolorum repellat aliquam nobis odio
        unde illo debitis commodi incidunt eligendi? Placeat veniam ipsum in
        minus autem? Enim..
      </p>
      <Button>Check out</Button>
    </Container>
  );
};

export default Home;
