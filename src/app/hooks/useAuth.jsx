import { useContext, useCallback } from "react";
import { signIn, signOut } from "next-auth/react";
import { UserContext } from "../../context/UserContext";

const useAuth = () => {
   const context = useContext(UserContext);
   if (context === undefined) {
      throw new Error("useAuth hook must be used within a UserProvider");
   }

   const { userData, fetchUser } = context;
   console.log("Fetched user data:", userData);

   const login = useCallback(async (provider, options) => {
      try {
         const response = await signIn(provider, options);
         if (response?.error) {
            throw new Error(response.error);
         } else if (!response) {
            throw new Error("Authentication failed");
         }
         return response;
      } catch (error) {
         throw error;
      }
   }, []);

   const logout = useCallback((callbackUrl = "/") => {
      signOut({ redirect: true, callbackUrl: callbackUrl })
   }, []);

   return { userData, fetchUser, login, logout };
}

export default useAuth;
