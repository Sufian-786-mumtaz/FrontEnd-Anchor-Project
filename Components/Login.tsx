import { useRouter } from "next/router"
import axios from "axios"
import Link from 'next/link'
import toast, { Toaster } from "react-hot-toast"
import { useDispatch } from "../store/store"
import { addUsers } from "../store/cartSlice"
import cookie from "js-cookie"
import { useFormik } from "formik"
import { loginSchema } from "../Yup Schemas"
const initialValues = {
  userName: "",
  password: ""
}
const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { handleChange, handleSubmit, handleBlur, errors, values, touched } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      await axios.post("http://localhost:8999/users/login", {
        userName: values.userName,
        password: values.password
      })
        .then(function (response) {
          if (response.status === 200) {
            cookie.set("token", response.data.token)
            let token = response.data.token
            dispatch(addUsers({ ...values, token: token }))
            router.push("/home")
            toast.success("User Loged in Successfully")
          }
        })
        .catch(function (error) {
          toast.error("Incorrect Username or Password")
        })
    }
  })


  return (
    <>
      <div>
        <div className="login">
          <div className="login_wrapper px-8 py-8 bg-white flex justify-center items-center flex-col gap-8 rounded-xl">
            <h2 className="text-3xl font-bold text-[#2e2e2e] my-5">Login</h2>
            <form action="" onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="w-full">
                <input type="text" className="login_input border-2 border-[#2e2e2e] w-full"
                  placeholder="User Name" name="userName" value={values.userName} onChange={handleChange} onBlur={handleBlur} />
                {errors.userName && touched.userName ? <p className="text-red-500 break-words">{errors.userName}</p> : null}
              </div>
              <div>
                <input type="password" className="login_input border-2 border-[#2e2e2e] w-full"
                  placeholder="Password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
                {errors.password && touched.password ? <p className="text-red-500">{errors.password}</p> : null}
              </div>
              <div className="text-center">
                <button className="bg-red-500 px-6 py-2 font-bold text-white my-5 rounded-3xl hover:bg-[#2e2e2e] hover:text-white transition" type="submit">Sign In</button>
              </div>
            </form>
            <p>Dont have account? <Link href="/signup" className="text-blue-900 font-semibold">Signup Now</Link></p>
          </div>
          <Toaster />

        </div>
      </div>
    </>
  )
}

export default Login