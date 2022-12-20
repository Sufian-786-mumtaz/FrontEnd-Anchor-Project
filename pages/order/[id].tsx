import { client } from "../../lib/client"
import Header from "../../Components/Header"
import {FaFileInvoiceDollar} from "react-icons/fa"
import {AiOutlineDeliveredProcedure} from "react-icons/ai"
import Image from "next/image"
import cooking from "../../public/assets/cooking.png"
import Onway from "../../public/assets/onway.png"
import Spinner from "../../public/assets/spinner.svg"
import Cookies from "js-cookie"
import { useEffect } from "react"
const Order = ({ order }: any) => {
    
    useEffect(()=>{
        if(order.status > 3){
            Cookies.remove("id")
        }
    },[order])
    return (
        <div>
            <Header />
            <div className="flex justify-center items-center gap-16 my-12 flex-col">
                <span className="font-bold text-[2rem]">Order in Process</span>
                <div className="flex gap-4 flex-col w-[40rem]">
                    <div className="flex justify-between">
                        <span>Order Id</span>
                        <span className="font-bold">{order._id}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Customer Name</span>
                        <span className="font-bold">{order.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Phone No</span>
                        <span className="font-bold">{order.phone}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Method</span>
                        <span className="font-bold">{order.method == 0 ? "Cash on delivery" : "Online Payment (Paid)"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Total</span>
                        <span className="font-bold">${order.total}</span>
                    </div>
                </div>
                <div className="flex gap-60">
                    <div className="flex flex-col items-center gap-8 w-12 relative">
                        <FaFileInvoiceDollar className="w-[3.5rem] h-[3.5rem] text-[#F54548]" />
                        <span>Payment</span>
                        {order.method === 0 ? (
                            <span className="w-max bg-orange-500 p-2 rounded-3xl text-white font-semibold">On Delivery</span>
                        ):(
                            <span className="w-max bg-green-500 p-2 rounded-3xl text-white font-semibold"   >Completed</span>
                        )}
                    </div>
                    <div className="flex flex-col items-center gap-8 w-12 relative">
                        <Image src={cooking} alt="cooking" width={50} height={50} />
                        <span>Cooking</span>
                        {order.status === 1 && (
                            <div className="absolute w-[6rem] top-[-1.5rem] left-[-1.5rem] ">
                                <Image src={Spinner} alt="spinner" />
                            </div>
                        )}
                        {order.status > 1 && (
                            <span className="w-max bg-green-500 p-2 rounded-3xl text-white font-semibold">Completed</span>
                        )}
                    </div>
                    <div className="flex flex-col items-center gap-8 w-12 relative">
                        <Image src={Onway} alt="onway" width={50} height={50} />
                        <span>OnWay</span>
                        {order.status === 2 && (
                            <div className="absolute w-[6rem] top-[-1.5rem] left-[-1.5rem] ">
                                <Image src={Spinner} alt="spinner" />
                            </div>
                        )}
                         {order.status > 2 && (
                            <span className="w-max bg-green-500 p-2 rounded-3xl text-white font-semibold">Completed</span>
                        )}
                    </div>
                    <div className="flex flex-col items-center gap-8 w-12 relative">
                        <AiOutlineDeliveredProcedure className="w-[3.5rem] h-[3.5rem] text-[#F54548]" />
                        <span>Delivered</span>
                        {order.status === 3 && (
                            <div className="absolute w-[6rem] top-[-1.5rem] left-[-1.5rem] ">
                                <Image src={Spinner} alt="spinner" />
                            </div>
                        )}
                        {order.status > 3 && (
                            <span className="w-max bg-green-500 p-2 rounded-3xl text-white font-semibold">Completed</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

//Fetch the data from the sanity studio whose id equals to params's id
export const getServerSideProps = async ({ params }) => {
    const query = `*[_type == 'order' && _id == '${params.id}']`
    const order = await client.fetch(query)
    return {
        props: {
            order: order[0]
        }
    }
}
export default Order