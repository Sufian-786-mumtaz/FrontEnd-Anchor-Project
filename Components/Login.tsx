import { useRouter } from "next/router"
import Link from 'next/link'
import toast, { Toaster } from "react-hot-toast"
import { useDispatch } from "../store/store"
import { addUsers } from "../store/cartSlice"
import { useFormik } from "formik"
import { loginSchema } from "../Yup Schemas"
import { useState } from "react"
import useAuth from "../hooks/useAuth"
const initialValues = {
  email: "",
  password: ""
}
const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [login, setLogin] = useState(false)
  const {signIn} = useAuth()
  const { handleChange, handleSubmit, handleBlur, errors, values, touched } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      if(login){
         dispatch(addUsers(values))
         signIn(values.email, values.password)
      }else{
        setLogin(false)
      }
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
                <input type="email" className="login_input border-2 border-[#2e2e2e] w-full"
                  placeholder="Email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                {errors.email && touched.email ? <p className="text-red-500 break-words">{errors.email}</p> : null}
              </div>
              <div>
                <input type="password" className="login_input border-2 border-[#2e2e2e] w-full"
                  placeholder="Password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
                {errors.password && touched.password ? <p className="text-red-500">{errors.password}</p> : null}
              </div>
              <div className="text-center">
                <button className="bg-red-500 px-6 py-2 font-bold text-white my-5 rounded-3xl 
                hover:bg-[#2e2e2e] hover:text-white transition" type="submit" onClick={()=>setLogin(true)}>Sign In</button>
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