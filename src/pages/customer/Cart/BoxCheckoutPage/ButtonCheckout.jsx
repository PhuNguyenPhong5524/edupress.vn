import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import useAuth from "../../../../hooks/useAuth";
import ArrowRightIcon from "../../../../components/icons/ArrowRightIcon";

const ButtonCheckout = ({ showCart, finalTotal , clearCartByUser}) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        if (!showCart?.length) {
            message.warning("Giỏ hàng trống");
            return;
        }

        if (!user?.id) {
            message.error("Vui lòng đăng nhập");
            return;
        }

        try {
            setLoading(true);

            const payload = {
                user_id: user.id,
                course_ids: showCart.map(item => item.course_id),
                total: finalTotal,
                status: "pending",
                created_at: new Date().toISOString(),
            };

            // 1️⃣ TẠO ORDER
            await axios.post(
            "https://mindx-mockup-server.vercel.app/api/resources/checkout?apiKey=6957348a9dda81df11d0c527",
            payload
            );

            // 2️⃣ ĐỔI STATUS CART → checked_out
            await clearCartByUser(user.id);

            message.success("Tạo đơn hàng thành công");

            // 👉 Sau này:
            // setOrderId(order._id);
            // openQrModal();

        } catch (error) {
            console.error(error);
            message.error("Thanh toán thất bại, vui lòng thử lại");
        } finally {
            setLoading(false);
        }
    };



    return (
        <button
            onClick={handleCheckout}
            disabled={loading}
            className={`
                w-full mt-5 bg-[#FF782D]
                ${loading ? "opacity-60 cursor-not-allowed" : "hover:opacity-60 hover:scale-95"}
                flex items-center justify-center gap-3
                text-white py-3 rounded-lg
                font-semibold transition
            `}
        >
            {loading ? "Đang xử lý..." : (
                <>
                    <ArrowRightIcon size={20} />
                    Thanh toán
                </>
            )}
        </button>
    );
};

export default ButtonCheckout;
