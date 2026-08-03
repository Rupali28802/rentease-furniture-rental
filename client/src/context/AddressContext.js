import React, { createContext, useEffect, useState } from "react";
import { api } from "../api/axios";
import { useContext } from "react";

const AddressContext = createContext();

export addressProvider = ({children})=>{
    const [addresses,setAddresses] = useState([]);
    const [selectedAddress,setSelectedAddress] = useState(null);

    const fetchAddresses = async()=>{
        const res = await api.get("/address");
        setAddresses(res.data.addresses);

    };

    const addAddresses = async(from)=>{
        const res = await api.post("/address",form);
        setAddresses(res.data.addAddresses);
    };

    const updateAddress = async(id,from)=>{
        const res = await api.put(`/address/${id}`,form)
        setAddresses(res.data.addAddresses)
    };

    const deleteAddress = async(id)=>{
        const res = await api.delete(`/address/${id}`);
        setAddresses(res.data.addAddresses);
    };

    useEffect(()=>{
        fetchAddresses();
    },[]);

    return(
        <AddressContext.Provider
        value={{addresses,selectedAddress,setSelectedAddress,addAddresses,updateAddress,deleteAddress}}>{children}</AddressContext.Provider>
    );
};

export const useAddress = ()=>useContext(AddressContext)