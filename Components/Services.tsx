import Image from "next/image"
import s1 from "../public/assets/s1.png"
import s2 from "../public/assets/s2.png"
import s3 from "../public/assets/s3.png"
const services = () => {
    return (
        <div className="py-10">
            <div className="flex flex-col justify-center items-center font-bold gap-2">
                <span className="text-red-500">WHAT WE SERVE</span>
                <span className="text-1xl text-[#2e2e2e] sm:text-3xl">YOUR FOVOURITE FOOD</span>
                <span className="text-1xl text-[#2e2e2e] sm:text-3xl">DELIVERY PARTNER</span>
            </div>
            <div className="flex justify-around items-center mt-[3rem] flex-col md:flex-row">
                <div className="features">
                    <div className="imageWrapper">
                        <Image src={s1} alt="Service 1" layout="intrinsic" objectFit="cover" />
                    </div>
                    <span className="font-semibold">Easy to Order</span>
                    <span className="text-gray-900 w-[15rem] break-words text-center px-5">You only need a few steps in food ordering</span>
                </div>
                <div className="features">
                    <div className="imageWrapper">
                        <Image src={s2} alt="Service 2" layout="intrinsic" objectFit="cover" />
                    </div>
                    <span className="font-semibold">Easy to Order</span>
                    <span className="text-gray-900 w-[15rem] break-words text-center px-5">You only need a few steps in food ordering</span>
                </div>
                <div className="features">
                    <div className="imageWrapper">
                        <Image src={s3} alt="Service 2" layout="intrinsic" objectFit="cover" />
                    </div>
                    <span className="font-semibold">Easy to Order</span>
                    <span className="text-gray-900 w-[15rem] break-words text-center px-5">You only need a few steps in food ordering</span>
                </div>
            </div>
        </div>

    )
}

export default services