import { useContext } from "react";
import JwtAuthContext from "@/hooks/JwtAuthContext";

const useAuthContext = () => useContext(JwtAuthContext);
export default useAuthContext;
