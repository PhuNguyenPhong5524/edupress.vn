import { Spin } from "antd";
import BoxResult from "./BoxResult/BoxResult";
import { Navigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useCartStore } from "../../../stores/cart.store";


const API_KEY = "6957348a9dda81df11d0c527";

const CHECKOUT_API =
  `https://mindx-mockup-server.vercel.app/api/resources/checkout?apiKey=${API_KEY}`;

const CHECKOUT_ITEM_API = (id) =>
  `https://mindx-mockup-server.vercel.app/api/resources/checkout/${id}?apiKey=${API_KEY}`;

const CART_API =
  `https://mindx-mockup-server.vercel.app/api/resources/cart?apiKey=${API_KEY}`;

const CART_ITEM_API = (id) =>
  `https://mindx-mockup-server.vercel.app/api/resources/cart/${id}?apiKey=${API_KEY}`;


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

        // 1️⃣ Fetch checkout (chống cache)
        const res = await axios.get(`${CHECKOUT_API}&_t=${Date.now()}`);
        const checkoutList = res.data?.data?.data || [];

        const checkout = checkoutList.find(c => c.token === token);

        // Không tìm thấy đơn
        if (!checkout) {
            setIsStatus("invalid");
            return;
        }

        // Đơn đã thanh toán
        if (checkout.status === "paid") {
            setIsStatus("already_paid");
            return;
        }

        // Không hợp lệ
        if (checkout.status !== "pending") {
            setIsStatus("invalid");
            return;
        }

        // Update checkout -> PAID
        await axios.put(
            CHECKOUT_ITEM_API(checkout._id),
            {
            status: "paid",
            updatedAt: new Date().toISOString(),
            }
        );

        // Update cart 
        try {
            const resCart = await axios.get(`${CART_API}&_t=${Date.now()}`);
            const cart = resCart.data?.data?.data?.find(
                c => c.user_id === checkout.user_id && c.status === "active"
            );

            if (cart) {
                await axios.put(
                CART_ITEM_API(cart._id),
                {
                    user_id: cart.user_id,
                    courses: [],
                    status: "inactive",
                    updatedAt: new Date().toISOString(),
                }
                );
            }
        } catch (cartErr) {
            console.warn("⚠️ Update cart failed:", cartErr);
        }

        // Clear UI cart + success
        clearCartUI();
        setIsStatus("success");
        Navigate(`/checkout?token=${token}`);
        } catch (err) {
            console.error("❌ Scan failed:", err);
            setIsStatus("error");
        }
    };

    handleScan();
    }, [token, clearCartUI]);


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