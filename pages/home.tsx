import Header from "../Components/Header"
import Menu from "../Components/Menu"
import { client } from "../lib/client"
const Home = ({ pizzas }: any) => {
  console.log(pizzas)
  return (
    <div>
      <Header />
      <main>
        <h1 className="text-center text-3xl py-8 font-bold text-[#2e2e2e]">Our Menu</h1>
        <Menu pizzas={pizzas} />
      </main>
    </div>
  )
}

//Fetching the data from sanity studio through getServerSideProps
export const getServerSideProps = async () => {
  const query = '*[_type == "pizza"]';
  const pizzas = await client.fetch(query);

  return {
    props: {
      pizzas
    },
  }
}
export default Home