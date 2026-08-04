import React, { createContext, useEffect, useState, useContext } from "react";
import { api } from "../api/axios";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const fetchAddresses = async () => {
    try {
      const res = await api.get("/address");
      setAddresses(res.data.addresses);

      // agar koi default address hai to select karo
      const defaultAddr = res.data.addresses.find((a) => a.isDefault);
      if (defaultAddr) setSelectedAddress(defaultAddr);
    } catch (err) {
      console.error("Failed to fetch addresses:", err);
    }
  };

  const addAddress = async (form) => {
    const res = await api.post("/address", form);
    setAddresses(res.data.addresses);
  };

  const updateAddress = async (id, form) => {
    const res = await api.put(`/address/${id}`, form);
    setAddresses(res.data.addresses);
  };

  const deleteAddress = async (id) => {
    const res = await api.delete(`/address/${id}`);
    setAddresses(res.data.addresses);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <AddressContext.Provider
      value={{
        addresses,
        selectedAddress,
        setSelectedAddress,
        addAddress,
        updateAddress,
        deleteAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => useContext(AddressContext);
