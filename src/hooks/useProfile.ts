import { useContext } from "react";
import { ProfileContext } from "../context/profileContext";

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile harus dipakai dalam ProfileProvider");
  return context;
};