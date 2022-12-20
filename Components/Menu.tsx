import Image from "next/image"
import Link from "next/link"
import { urlFor } from "../lib/client"
const Menu = (pizzas: any) => {
  return (
    <div>
      <div className="flex item-center justify-around flex-wrap gap-y-[2rem] px-10">
        {
          pizzas.pizzas.map((pizza, id) => {
            const src = urlFor(pizza.image).url()
            return (
              <div className=" flex item-start justify-center cursor-pointer flex-col gap-2 text-2xl font-bold text-[#2e2e2e]" key={id}>
                <Link href={`./Pizza/${pizza.slug.current}`}>
                  <div className="imageWrapper">
                    <Image className="hover:scale-100"
                      loader={() => src}
                      layout="fill"
                      objectFit="cover"
                      src={src} alt="pizza image" />
                  </div>
                </Link>
                <span >{pizza.name}</span>
                <span className="font-normal text-[1.3rem] text-gray-500">{pizza.detail}</span>
                <span><span className="text-red-500">$</span>{pizza.price[1]}</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
export default Menu



