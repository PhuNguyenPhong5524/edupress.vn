import { Spin } from "antd";
import BoxResult from "./BoxResult/BoxResult";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const API_CHECKOUT = "https://mindx-mockup-server.vercel.app/api/resources/checkout?apiKey=6957348a9dda81df11d0c527";

const ScanPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [isStatus, setIsStatus] = useState("loading");
    
    useEffect(() => {
        const handleScan = async () => {
            if (!token) {
                setIsStatus("invalid");
            return;
            }

            setIsStatus("loading");

            try {
            const res = await axios.get(`${API_CHECKOUT}&token=${token}`);
            const checkout = res.data?.data?.data?.[0];

            if (!checkout) {
                setIsStatus("invalid");
                return;
            }

            if (checkout.status !== "pending") {
                setIsStatus("done");
                return;
            }

            await axios.put(
                `https://mindx-mockup-server.vercel.app/api/resources/checkout/${checkout._id}?apiKey=6957348a9dda81df11d0c527`,
                {
                ...checkout,
                status: "paid",
                updatedAt: new Date().toISOString()
                }
            );

            setIsStatus("success");

            if (checkout.cart_id) {
                axios
                .delete(
                    `https://mindx-mockup-server.vercel.app/api/resources/cart/${checkout.cart_id}?apiKey=6957348a9dda81df11d0c527`
                )
                .catch(console.error);
            }
            } catch (error) {
                console.error(error);
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