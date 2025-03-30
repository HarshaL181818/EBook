import { useContext } from "react"
import { AuthContext } from "../contects/AuthProvider"
import { useQuery } from "@tanstack/react-query";

const useCart = () => {
    const {user} = useContext(AuthContext);
    const {refetch, data:cart =[]} = useQuery({
        queryKey: ['cart-option', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/cart-option?email=${user?.email}`)
            return res.json();
          },
    })

  return [cart, refetch]
}

export default useCart