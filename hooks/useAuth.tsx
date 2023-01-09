import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from "firebase/auth";
import { useState, useEffect, useMemo, createContext, useContext } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase";
import { toast } from "react-hot-toast";
import cookie from "js-cookie";

interface AuthProviderProps {
    children: React.ReactNode
}
interface IAuth {
    user: User | null
    signUp: (email: string, password: string) => Promise<void>,
    signIn: (email: string, password: string) => Promise<void>,
    logout: () => Promise<void>,
    error: string | null,
    loading: boolean
}
const AuthContext = createContext<IAuth>({
    user: null,
    signUp: async () => { },
    signIn: async () => { },
    logout: async () => { },
    error: null,
    loading: false,
})
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [loading, setLoading] = useState(false)
    const [initialLoading, setInitialLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState(null)
    const router = useRouter()
    
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log(auth);
            if (user) {
                setUser(user)
                setLoading(false)

            } else {
                setUser(null)
                setLoading(true)
                router.push("/login")
            }
            setInitialLoading(false)
        })
    }, [auth])
    const signUp = async (email: string, password: string) => {
        setLoading(true)
        await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            setUser(userCredential.user)
            toast.success("User Registered in Successfully")
            router.push("/login")
            setLoading(false)
        })
            .catch((error) => {
                alert(error.message)
            }).finally(() => {
                setLoading(false)
            })
    }

    const signIn = async (email: string, password: string) => {
        setLoading(true)
        await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            setUser(userCredential.user)
            cookie.set("session", user)
            toast.success("User Loged in Successfully")
            router.push("/home")
            setLoading(false)
        })
            .catch((error) => {
                alert(error.message)
            }).finally(() => {
                setLoading(false)
            })
    }

    const logout = async () => {
        setLoading(true)
        signOut(auth).then(() => {
            setUser(null)
            cookie.remove("session")
        }).catch((error) => {
            alert(error.message)
        }).finally(() => setLoading(false))
    }
    const memoedValue = useMemo(() => ({
        user, signUp, signIn, logout, error, loading
    }), [user, loading, error])

    return (
        <AuthContext.Provider value={memoedValue}>
            <>
            {children}
            </>      
        </AuthContext.Provider>
      )
}
export default function useAuth() {
    return useContext(AuthContext)
}
