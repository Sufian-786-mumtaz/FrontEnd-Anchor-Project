import {GiCherry} from "react-icons/gi"
import Image from "next/image"
import HeroImage from "../public/assets/HeroImage.png"
import Link from "next/link"
const Hero = () => {
  return (
    <div className="flex justify-between md:items-center p-8 flex-col md:flex-row">
        <div className="flex flex-col justify-start pt-5">
            <div className="flex justify-start items-center gap-3 mb-5 md:mb-10 text-3xl">
            <p className="text-[#2e2e2e] font-semibold text-[1.5rem] md:text-3xl">More than faster</p>
            <GiCherry className="text-red-600 h-10 w-10" />
            </div>
            <h1 className="text-[#2e2e2e] text-2xl sm:text-5xl w-[20rem] sm:w-[30rem] font-bold leading-[2rem] md:leading-[4rem] break-words">BE THE FASTEST IN DELEVERING YOUR <span className="text-red-500">PIZZA</span></h1>
            <p className="w-[20rem] py-8 text-gray-800 font-semibold">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique error quasi blanditiis, laudantium impedit alias.</p>
            <Link href="/login">
            <button className=" w-24  h-8 md:w-28 h-12 bg-red-600 rounded-3xl text-white font-semibold text-sm  ">Get Started</button>
            </Link>

        </div>
        <div className="md:w-[34rem]">
            <Image src={HeroImage} alt= "Hero image" objectFit="cover" layout="intrinsic" />
        </div>
    </div>
  )
}

export default Hero