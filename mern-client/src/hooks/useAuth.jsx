import { useContext } from "react"
import { AuthContext } from "../contects/AuthProvider"

const useAuth = () => {
    const auth = useContext(AuthContext)
    return auth
}

export default useAuth