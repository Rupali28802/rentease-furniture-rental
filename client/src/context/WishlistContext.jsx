import React,{createContext, useEffect, useState} from "react";
import { api } from "../api/axios";


const WishlistContext = createContext();
export const useWishlist = ()=>useContext(WishlistContext);

export const WishlistProvider = ({children})=>{
    const[wishlist,setWishlist] = useState([]);

    useEffect(()=>{
        const fetchWishlist = async()=>{
            try {
                const res = await api.get("/wishlist");
                setWishlist(res.send.data.item || [])
            } catch (error) {
                console.log("Error fetching wishlist:",error);
                
            }
        };
        fetchWishlist()
    },[]);


    const toggleWishlist = async(productId)=>{
        try {
            const res= await api.post("/wishlist/toggle",{productId});
            setWishlist(res.data.items || []);
        } catch (error) {
            console.log("wishlist toggle error:",err);
            
        }
    };
    return(
        <WishlistContext.Provider value={{wishlist,toggleWishlist}}>
            {children}
        </WishlistContext.Provider>
    )
}