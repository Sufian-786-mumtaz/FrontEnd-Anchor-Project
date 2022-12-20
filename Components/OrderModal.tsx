import { Modal, useMantineTheme } from "@mantine/core"
import { useState } from "react";
import { createOrder } from "../lib/orderHandler"
import toast, { Toaster } from "react-hot-toast"
import { useDispatch } from "../store/store";
import { resetCart } from "../store/cartSlice";
import { useRouter } from "next/router";
import cookie from "js-cookie"
import { parseCookies } from "nookies";
const OrderModal = ({ opened, setOpened, paymentMethond }: any) => {
  const { id } = parseCookies()
  const [order, setOrder] = useState(id)
  console.log(order)
  const dispatch = useDispatch()
  const router = useRouter()
  const [formData, setFormData] = useState({})
  const theme = useMantineTheme()
  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const total = typeof window !== "undefined" && localStorage.getItem("total")
  const handleForm = async (e) => {
    e.preventDefault()
    const id = await createOrder({ ...formData, total, paymentMethond } as const)
    dispatch(resetCart())
    router.push(`/order/${id}`)
    toast.success("Order placed Successfully")
    cookie.set("id", id)
  }
  return (
    <>
      <Modal
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={opened}
        onClose={() => setOpened(null)}
      >
        {total > 0 ?
          <form action="" className="flex flex-col items-center gap-4" onSubmit={handleForm}>
            <input type="text" name="Name" required placeholder="Name"
              onChange={handleInput} className="border-2 w-full p-3 rounded" />
            <input type="text" name="Phone" required placeholder="Phone No"
              onChange={handleInput} className="border-2 w-full p-3 rounded" />
            <textarea name="Address" placeholder="Address" rows={3}
              onChange={handleInput} className="border-2 w-full p-3 rounded"></textarea>
            <span>You will pay <span className="text-red-500 font-bold">${total}</span> on delivery</span>
            <button className="bg-green-500 text-white font-semibold px-3 cursor-pointer
          rounded-3xl py-2" type="submit">Order Now</button>
          </form> :
          <h2 className="text-center font-semibold text-2xl text-red-500">Your Cart is Empty</h2>
        }

      </Modal>
      <Toaster />
    </>
  )

};

export default OrderModal