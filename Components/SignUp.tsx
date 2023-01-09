import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import { useRouter } from "next/router"
import { useFormik } from "formik"
import { signupSchema } from "../Yup Schemas"
import { useState } from "react"
import useAuth from "../hooks/useAuth"
const initialValues = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  confirm_password: ""
}
const Signup = () => {
  const router = useRouter()
  const [signup, setSignUp] = useState(false)
  const {signUp} = useAuth()
  const { values, errors, handleBlur, handleSubmit, touched, handleChange } = useFormik({
    initialValues: initialValues,
    validationSchema: signupSchema,
    onSubmit: async (values, action) => {
      if(signup){
        signUp(values.email, values.password)
        action.resetForm()
      }else{
        setSignUp(false)
      }
    }
  })

  return (
    <div>
      <div className="login">
        <div className="login_wrapper px-8 py-2 bg-white flex justify-center items-center flex-col gap-8 rounded-xl">
          <h2 className="text-3xl font-bold text-[#2e2e2e] my-5">Sign Up</h2>
          <form action="" className="flex flex-col justify-between gap-8"
            onSubmit={handleSubmit}>
            <div className="flex gap-6">
              <div className="flex flex-col">
                <input type="text" className="login_input border-2 border-[#2e2e2e]"
                  placeholder="First Name" name="firstName" value={values.firstName} onChange={handleChange} onBlur={handleBlur} />
                {errors.firstName && touched.firstName ? <p className="text-red-500">{errors.firstName}</p> : null}
              </div>
              <div>
                <input type="text" className="login_input border-2 border-[#2e2e2e] w-full"
                  placeholder="Last Name" name="lastName" value={values.lastName} onChange={handleChange} onBlur={handleBlur} />
                {errors.lastName && touched.lastName ? <p className="text-red-500">{errors.lastName}</p> : null}
              </div>
            </div>
            <div>
              <input type="text" className="login_input border-2 border-[#2e2e2e] w-full"
                placeholder="User Name" name="userName" value={values.userName} onChange={handleChange} onBlur={handleBlur} />
              {errors.userName && touched.userName ? <p className="text-red-500">{errors.userName}</p> : null}
            </div>
            <div>
              <input type="email" className="login_input border-2 border-[#2e2e2e] w-full"
                placeholder="Email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
              {errors.email && touched.email ? <p className="text-red-500">{errors.email}</p> : null}
            </div>
            <div>
              <input type="password" className="login_input border-2 border-[#2e2e2e] w-full"
                placeholder="Password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
              {errors.password && touched.password ? <p className="text-red-500">{errors.password}</p> : null}
            </div>
            <div>
              <input type="password" className="login_input border-2 border-[#2e2e2e] w-full"
                placeholder="Confirm Password" name="confirm_password" value={values.confirm_password} onChange={handleChange} onBlur={handleBlur} />
              {errors.confirm_password && touched.confirm_password ? <p className="text-red-500">{errors.confirm_password}</p> : null}
            </div>

            <div className="text-center">
              <button className="bg-red-500 px-8 py-2 font-bold text-white my-2 rounded-3xl hover:bg-[#2e2e2e]
             hover:text-white transition" type="submit" onClick={()=>setSignUp(true)} >Sign Up</button>
            </div>

          </form>

        </div>
        <Toaster />

      </div>
    </div>
  )
}

export default Signup