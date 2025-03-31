import { useContext } from "react"
import { AuthContext } from "../contects/AuthProvider"
import { useQuery } from "@tanstack/react-query";
import API_BASE_URL from '../config';

const useCart = () => {
    const {user} = useContext(AuthContext);
    const {refetch, data:cart =[]} = useQuery({
        queryKey: ['cart-option', user?.email],
        queryFn: async () => {
            const res = await fetch(`${API_BASE_URL}/cart-option?email=${user?.email}`)
            return res.json();
          },
    })

  return [cart, refetch]
}

export default useCart