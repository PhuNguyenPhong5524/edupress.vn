import { Spin } from "antd";
import BoxResult from "./BoxResult/BoxResult";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useCartStore } from "../../../stores/cart.store";


const API_CHECKOUT = "https://mindx-mockup-server.vercel.app/api/resources/checkout?apiKey=6957348a9dda81df11d0c527";
const CART_API = "https://mindx-mockup-server.vercel.app/api/resources/cart?apiKey=6957348a9dda81df11d0c527";
const ScanPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [isStatus, setIsStatus] = useState("loading");
    
    const clearCartUI = useCartStore(state => state.clearCartUI);

    useEffect(() => {
        if (!token) return;

        const handleScan = async () => {
            try {
            setIsStatus("loading");

            // 1️⃣ get checkout (CHỐNG CACHE)
            const res = await axios.get(
                `${API_CHECKOUT}&_t=${Date.now()}`
            );

            const checkout = res.data?.data?.data?.find(
                c => c.token === token && c.status === "pending"
            );

            if (checkout.status === "paid") {
                setIsStatus("already_paid");
                return;
            }

            if (checkout.status !== "pending") {
                setIsStatus("invalid");
                return;
            }

            // 2️⃣ update checkout
            await axios.put(
                `https://mindx-mockup-server.vercel.app/api/resources/checkout/${checkout._id}?apiKey=6957348a9dda81df11d0c527`,
                {
                    status: "paid",
                    updatedAt: new Date().toISOString(),
                }
            );

            // 3️⃣ update cart
            const resCart = await axios.get(
                `${CART_API}?_t=${Date.now()}`
            );

            const cart = resCart.data?.data?.data?.find(
                c => c.user_id === checkout.user_id && c.status === "active"
            );

            if (cart) {
                await axios.put(
                `${CART_API}/${cart._id}?apiKey=6957348a9dda81df11d0c527`,
                {
                    user_id: cart.user_id,
                    courses: [],
                    status: "inactive",
                    updatedAt: new Date().toISOString(),
                }
                );
            }

            clearCartUI();
            setIsStatus("success");
            } catch (e) {
            console.error(e);
            setIsStatus("error");
            }
        };

        handleScan();
    }, [token]);

    return (
        <div className="mt-[90px]  max-w-[1080px] mx-auto">
            <div className="h-screen">
                <div className="w-full absolute top-0 left-0 h-screen flex items-center justify-center">
                    {/* <Spin fullscreen size="large" /> */}
                    <BoxResult isStatus={isStatus}  />
                </div>
            </div>
        </div>
    )
}

export default ScanPage;