"use client";
import { Provider } from "react-redux";
import { AppStore, setupStore } from "./store";
import { useEffect, useRef } from "react";
import AuthService from "../services/AuthService";
import { useRouter } from "next/navigation";
import axios from "axios";
import { IUserAuthResponse } from "../interfaces/user/IUserAuthResponse";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;



export const store = setupStore();
export default function StoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const storeRef = useRef<AppStore>()
    const router = useRouter();
    
    if (!storeRef.current) {
    storeRef.current = store;
    }
//     useEffect(() => {
//     const auth = async () => {
//         try {
//             const response = await axios.get<IUserAuthResponse>(
//                 apiUrl + "/sessions/auth/refresh",
//                 {
//                     withCredentials: true,
//                 }
//             );
//             const { data: user } = response;
//             await store.dispatch(AuthService.refreshTokens(user));
//          } catch (error) {
//             router.push("/")
//          }
//     }
//     auth()
// }, [])

    



	return <Provider store={store}>{children}</Provider>	
}
