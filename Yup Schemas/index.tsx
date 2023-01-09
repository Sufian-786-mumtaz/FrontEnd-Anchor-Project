import * as Yup  from "yup"

export const signupSchema = Yup.object({
    firstName: Yup.string().min(3).max(25).required("Please enter your first name"),
    lastName:Yup.string().min(3).max(25).required("Please enter your last name"),
    userName: Yup.string().min(6).max(15).required("Please enter your username"),
    email:Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(8).required("Please enter your password"),
    confirm_password: Yup.string().required().oneOf([Yup.ref("password"), null], "Password must match")
})

export const loginSchema = Yup.object({
    email:Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(8).required("Please enter your password")
})