import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import useAuth from "../../../../hooks/useAuth";
import ArrowRightIcon from "../../../../components/icons/ArrowRightIcon";

const ButtonCheckout = ({ showCart, finalTotal , checkoutCart, setCouponInput, setAppliedCoupon}) => {
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
                course_ids: showCart.map(i => i.course_id),
                total: finalTotal,
                status: "pending",
                created_at: new Date().toISOString(),
            };

            // TẠO ORDER
            await axios.post(
                "https://mindx-mockup-server.vercel.app/api/resources/checkout?apiKey=6957348a9dda81df11d0c527",
                payload
            );

            // ĐỔI CART STATUS
            await checkoutCart(user.id);

            // set coupon
            setCouponInput("");
            setAppliedCoupon(null);

            message.success("Tạo đơn hàng thành công");

            // 👉 sau này:
            // setOrderId(orderId)
            // openQrModal()

        } catch (error) {
            console.error(error);
            message.error("Thanh toán thất bại");
        } finally {
            setLoading(false);
        }
    };



    return (
        <>
            <button
                onClick={handleCheckout}
                disabled={loading}
                className={`
                    w-full mt-5 bg-[#FF782D]
                    ${loading ? "opacity-60 cursor-not-allowed" : "hover:opacity-60 hover:scale-95"}
                    flex items-center justify-center gap-3 text-[10px] md:text-[12px] lg:text-[14px]
                    text-white h-[40px] lg:h-[48px] rounded-lg
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
        </>
    );
};

export default ButtonCheckout;
