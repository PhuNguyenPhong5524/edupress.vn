import { Spin } from "antd";
import BoxResult from "./BoxResult/BoxResult";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCartStore } from "../../../stores/cart.store";


const API_CHECKOUT = "https://mindx-mockup-server.vercel.app/api/resources/checkout?apiKey=6957348a9dda81df11d0c527";

const ScanPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [isStatus, setIsStatus] = useState("loading");
    
    const clearCartUI = useCartStore(state => state.clearCartUI);

    useEffect(() => {
        if (!token) {
            setIsStatus("invalid");
            return;
        }

        const handleScan = async () => {
            try {
                setIsStatus("loading");

                // 1️⃣ Get checkout by token
                const res = await axios.get(`${API_CHECKOUT}&token=${token}`);
                const checkout = res.data?.data?.data?.[0];

                if (!checkout) {
                    setIsStatus("invalid");
                    return;
                }

                // 2️⃣ Nếu đã xử lý rồi → done
                if (checkout.status !== "pending") {
                    setIsStatus("done");
                    return;
                }

                // 3️⃣ Get cart active của user
                const resCart = await axios.get(
                    "https://mindx-mockup-server.vercel.app/api/resources/cart?apiKey=6957348a9dda81df11d0c527"
                );

                const cart = resCart.data?.data?.data?.find(
                    c => c.user_id === checkout.user_id && c.status === "active"
                );

                if (!cart) {
                    console.warn("Không tìm thấy cart active");
                    setIsStatus("error");
                    return;
                }

                // 4️⃣ Update checkout → paid
                await axios.put(
                    `https://mindx-mockup-server.vercel.app/api/resources/checkout/${checkout._id}?apiKey=6957348a9dda81df11d0c527`,
                    {
                        status: "paid",
                        updatedAt: new Date().toISOString()
                    }
                );

                // 5️⃣ Clear cart (🚨 KHÔNG spread cart)
                await axios.put(
                    `https://mindx-mockup-server.vercel.app/api/resources/cart/${cart._id}?apiKey=6957348a9dda81df11d0c527`,
                    {
                    user_id: cart.user_id,
                    courses: [],
                    status: "inactive",
                    updatedAt: new Date().toISOString()
                    }
                );

                //
                clearCartUI();
                setIsStatus("success");
            } catch (err) {
                console.error(err);
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