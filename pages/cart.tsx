import { useState } from "react"
import Header from "../Components/Header"
import { useSelector } from "react-redux"
import Image from "next/image"
import { urlFor } from "../lib/client"
import { useDispatch } from "react-redux"
import { removeToCart } from "../store/cartSlice"
import toast, { Toaster } from "react-hot-toast"
import OrderModal from "../Components/OrderModal"
import { useRouter } from "next/router"
import { RootState } from "../store/store"
const Cart = () => {
    interface cartDetail {
        quantity:number
    }
    const router = useRouter()
    const [paymentMethond, setpaymentMethond] = useState<null | number>(null)

    const dispatch = useDispatch()

    // Gets the cartitems data from redux using useSelector hook
    const cartDetail = useSelector((state:RootState) => state.Cart.cartItems)

    //Remove the items from the cart
    const handleRemove = (pizza: any) => {
        dispatch(removeToCart(pizza))
        toast.error(`${pizza.name} is removed from cart`)
    }

    //Calcute the total amount of the items
    const sumTotal = () => {
        const total = cartDetail.reduce((acc:any, curr:any) => {
            return acc + curr.quantity * curr.price
        }, 0)
        return total;
    }

    //Sets the payment method on delivery
    const handlePayOnDelivery = () => {
        { typeof window !== "undefined" && localStorage.setItem("total", sumTotal()) }
        setpaymentMethond(0)
    }

    //Sets the payment method with stripe
    const handleCheckOut = async () => {
        { typeof window !== "undefined" && localStorage.setItem("total", sumTotal()) }
        setpaymentMethond(1)
        const response = await fetch("/api/Stripe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cartDetail)
        });
        if (response.status === 500) return
        const data = await response.json()
        console.log(data)
        toast.loading("Redirecting...")
        router.push(data.url)
    }

    return (
        <>
            <Header />
            <div className="flex flex-col items-center p-[2rem] md:flex-row md:items-start">
                <div className="w-[100%] md:w-[70%]">
                    <table className="tabel flex flex-col justify-between w-[100%] border-separate border-spacing-4">
                        <div className="tableHeading flex font-bold justify-between  items-center">
                            <thead>Pizza</thead>
                            <thead className="">Name</thead>
                            <thead className="">Size</thead>
                            <thead className="">Price</thead>
                            <thead className="">Quantity</thead>
                            <thead className="">Total</thead>
                            <thead className="">Action</thead>
                            <thead></thead>
                        </div>
                        <tbody>
                            {
                                cartDetail.length > 0 &&
                                cartDetail.map((pizza: any, index: any) => {
                                    const src = urlFor(pizza.image).url()
                                    console.log(pizza)
                                    return (
                                        <tr key={index} className="flex py-5 justify-between items-center">
                                            <td className="w-[14%]">
                                                <Image
                                                    loader={() => src}
                                                    src={src}
                                                    alt="cartImage"
                                                    width={85}
                                                    height={85}
                                                    objectFit="cover"
                                                />
                                            </td>
                                            <td className="w-[15%]">{pizza.name}</td>
                                            <td>{pizza.Size === 0 ? "Small" : pizza.Size === 1 ? "Medium" : "Large"}
                                            </td>
                                            <td>{pizza.price}</td>
                                            <td>{pizza.quantity}</td>
                                            <td><span className="text-red-500">$</span>{pizza.quantity * pizza.price}</td>
                                            <td className="text-red-500 font-bold cursor-pointer" onClick={() => handleRemove(pizza)}>X</td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                    <Toaster />
                </div>
                <div className="flex flex-col gap-5 px-5 py-5 bg-white rounded-2xl shadow-2xl md:w-[30%]">
                    <span className="font-bold text-center text-xl whitespace-nowrap">Cart Summary</span>
                    <div className="mb-5">
                        <div className="cartItems flex justify-between w-full">
                            <span className="font-semibold">Items</span><span>{cartDetail.length}</span>
                        </div>
                        <div className="total flex justify-between w-full">
                            <span className="font-semibold">Total</span><span><span className="text-red-500">$</span>{sumTotal()}</span>
                        </div>
                    </div>

                    {cartDetail.length > 0 ? (
                        <div className="flex flex-col items-center justify-around gap-3 md:flex-row">
                            <button className="bg-red-500 text-white whitespace-nowrap text-sm font-semibold px-3 cursor-pointer
                    rounded-3xl py-2 hover:bg-[#2e2e2e] transition" onClick={handlePayOnDelivery}>Pay on Delivery</button>
                            <button className="bg-red-500 text-sm whitespace-nowrap text-white font-semibold px-3 cursor-pointer
                    rounded-3xl py-2 hover:bg-[#2e2e2e] transition" onClick={handleCheckOut}>Pay Now</button>
                        </div>
                    ) : null}



                </div>
            </div>
            <OrderModal opened={paymentMethond === 0} setOpened={setpaymentMethond} paymentMethond={paymentMethond} />
        </>
    )
}

export default Cart