import { GiFoodTruck } from "react-icons/gi"
import { FaShoppingCart } from "react-icons/fa"
import { FaUserCheck } from "react-icons/fa"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useSelector } from "react-redux"
import { logOut } from "../store/cartSlice"
import { useDispatch } from "../store/store"
import { useRouter } from "next/router"
import { parseCookies } from 'nookies'
import { BsReceipt } from "react-icons/bs"
import Cookies from "js-cookie"
import { RootState } from "../store/store"
import useAuth from "../hooks/useAuth"
const Header = () => {
    const { id } = parseCookies()
    const [order, setOrder] = useState("")
    const dispatch = useDispatch()
    const router = useRouter()
    const items = useSelector((state:RootState) => state.Cart)
    let users = useSelector((state:RootState) => state.Cart.users)
    const {logout} = useAuth()
    console.log(users)
    const handlelogout = () => {
        dispatch(logOut())
        logout()
        router.push("/login")

    }
    useEffect(() => {
        setOrder(id)
    }, [id])
    return (
        <div>
            <div className="flex justify-between items-center px-5 py-5">
                <div className="flex items-center gap-3 w-[75%] md:w-auto">
                    <GiFoodTruck className="logo_icon text-red-600" />
                    <p className="font-bold sm:text-2xl text-[#2e2e2e]">Pizza Point</p>
                </div>
                <div className="setHidden text-center">
                    <ul className="flex justify-between items-center">
                        <Link href="/">
                            <li className="text-2xl px-4 text-[#2e2e2e] hover:text-red-600 cursor-pointer transition duration-300 font-semibold">Home</li>
                        </Link>
                        <Link href="/login">
                            <li className="text-2xl px-4 text-[#2e2e2e] hover:text-red-600 cursor-pointer transition duration-300 font-semibold">Menu</li>
                        </Link>

                        <li className="text-2xl px-4 text-[#2e2e2e] hover:text-red-600 cursor-pointer transition duration-300 font-semibold">Contact</li>
                        <li className="text-2xl px-4 text-[#2e2e2e] hover:text-red-600 cursor-pointer transition duration-300 font-semibold">About</li>
                    </ul>
                </div>
                <div className="flex gap-3 items-center">
                    {
                        users && users[length] == null ?
                            <div className="flex items-center">
                                <Link href="/login" className="bg-red-500 px-5 text-center py-2 rounded-full text-white font-bold hover:bg-[#2e2e2e] transition">Login</Link>
                            </div> : null
                    }
                    <div className="flex gap-5">
                        {users[length] != null ?
                            <>
                                <button onClick={() => handlelogout()} className="bg-red-500 px-5 text-center text-sm py-2 whitespace-nowrap rounded-full text-white font-bold hover:bg-[#2e2e2e] transition">Log Out</button>
                            </>
                            : ""
                        }
                        {users[length] != null?
                            <Link href="/cart" className="flex gap-3">
                                <div className="flex justify-center items-center relative">
                                    <FaShoppingCart className="h-8 w-8  text-red-600 cursor-pointer" />
                                    <span className="h-6 w-6 rounded-full bg-black text-center text-white absolute top-0 left-6">{items.cartItems.length}</span>
                                </div>
                            </Link>
                            : ""
                        }

                        {order && users[length] != null && (
                            <Link href={`/order/${order}`}>
                                <div className="flex justify-center items-center relative">
                                    <BsReceipt size={35} color="#DC2626" />
                                    {order != "" && <span className="h-6 w-6 rounded-full bg-black text-center text-white absolute top-0 left-6">1</span>}
                                </div>
                            </Link>
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header