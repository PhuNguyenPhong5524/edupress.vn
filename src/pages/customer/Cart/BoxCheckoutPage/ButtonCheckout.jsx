import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import useAuth from "../../../../hooks/useAuth";
import ArrowRightIcon from "../../../../components/icons/ArrowRightIcon";
import { useNavigate } from "react-router-dom";

const ButtonCheckout = ({ showCart, cart, finalTotal , setCouponInput, appliedCoupon, setAppliedCoupon}) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();
    
    const handleCheckout = async () => {
        if (!showCart?.length) {
            message.warning("Giỏ hàng trống");
            return;
        }

        if (!user?._id) {
            message.error("Vui lòng đăng nhập");
            return;
        }

        const token = `ach${Date.now()}JLK${Math.floor(Math.random() * 1000)}`;

        const payload = {
            user_id: user?._id,
            cart_id: cart?._id,
            courses: showCart.map(item => ({
                course_id: item.course_id,
                title: item.course_title,
                price: item.price,
                image_url: item.image_url,
                total_lectures: item.total_lectures,
            })),

            coupon: appliedCoupon
                ? {
                    code: appliedCoupon.code,
                    percent: appliedCoupon.percent,
                }
                : null,

            total: finalTotal, 
            status: "pending",
            token,
            created_at: new Date().toISOString(),
        };


        try {
            setLoading(true);

            await axios.post(
            "https://mindx-mockup-server.vercel.app/api/resources/checkout?apiKey=6957348a9dda81df11d0c527",
            payload
            );

            message.success("Tạo đơn hàng thành công");
            setAppliedCoupon(null);
            setCouponInput("");
            nav(`/checkout?token=${token}`);
        } catch (err) {
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
