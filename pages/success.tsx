import { useState } from "react"
import Header from "../Components/Header"
import OrderModal from "../Components/OrderModal"
const Success = () => {
  const [method, setpaymentMethod] = useState(null)
  return (
    <div>
      <Header />
      <OrderModal opened={true} paymentMethond={1} setOpened={setpaymentMethod} />
    </div>
  )
}

export default Success  