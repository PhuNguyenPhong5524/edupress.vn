import { useMemo, useState } from "react";
import ArrowRightIcon from "../../../../components/icons/ArrowRightIcon";
import { message } from "antd";



const BoxCheckoutPage = ({
    showCart,
}) => {
  
    const [couponInput, setCouponInput] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState(null);


    const handleApplyCoupon = () => {
        if (!couponInput.trim()) return;

        const mockCoupons = {
            GIAM20: 20,
            GIAM30: 30,
            GIAM40: 40,
        };

        const code = couponInput.toUpperCase();
        const percent = mockCoupons[code];

        if (!percent) {
            message.error("Mã khuyến mãi không hợp lệ");
            return;
        }

        setAppliedCoupon({ code, percent });
        setCouponInput("");
    };

    // Tinh tong tien 
    const totalOriginalPrice = useMemo(() => {
        if (!Array.isArray(showCart)) return 0;

        return showCart.reduce((total, item) => {
            return total + (item.course?.price ?? 0);
        }, 0);
    }, [showCart]);

    const couponDiscount = useMemo(() => {
        if (!appliedCoupon) return 0;
        return Math.round((totalOriginalPrice * appliedCoupon.percent) / 100);
    }, [appliedCoupon, totalOriginalPrice]);

    const finalTotal = totalOriginalPrice - couponDiscount;

    return (
        <div className="bg-white rounded-xl shadow-sm p-5 h-fit sticky top-24">
            <h3 className="text-[20px] font-sans mb-4 text-[#6d6d6d]">
                Thanh toán 
            </h3>
            <div className="mt-6 space-y-2">
                <div className="text-[12px] md:text-[16px] lg:text-[16px] flex items-center justify-between">
                    <span className="font-semibold">Tạm tính:</span>
                    <span className="text-[#000000] font-semibold">
                        {  totalOriginalPrice === 0   
                            ? <span className="text-green-400 font-semibold">Free</span>
                            : `${Number(totalOriginalPrice).toLocaleString('vi-VN')} VND`
                        }
                    </span>
                </div>  

                {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                        <span>Giảm ({appliedCoupon.percent}%)</span>
                        <span>-{Number(couponDiscount).toLocaleString('vi-VN')} VND</span>
                    </div>
                )}

                <hr className="my-2 text-gray-300" />

                <div className="flex justify-between text-lg font-bold">
                    <span>Tổng</span>
                    <span className="text-[#c00000]">{Number(finalTotal).toLocaleString('vi-VN')} VND</span>
                </div>
            </div>
            <button 
                className="
                    w-full mt-5 bg-[#FF782D] hover:opacity-60 hover:scale-95 flex items-center justify-center gap-3
                    cursor-pointer text-white py-3 rounded-lg font-semibold transition
                "
            >
               <ArrowRightIcon size={20} /> Thanh toán
            </button>

            <p className="text-xs text-gray-500 mt-1">
                Bạn sẽ không bị tính phí ngay bây giờ
            </p>

            <hr className="my-2 text-gray-300" />

            {/* Khuyen mai */}
            <h3 className="text-lg font-bold ">Khuyến mãi</h3>
            <div className="mt-4">
                <div className="flex items-center justify-center gap-2">
                    <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder={`${appliedCoupon ? "Đã áp dụng" : "Mã khuyến mãi..."}`}
                        disabled={!!appliedCoupon}
                        className="
                            w-full focus:outline-none focus:ring-1 focus:ring-[#FF782D] py-[8px] pl-1
                            placeholder:text-[#a4a4a4] placeholder:text-[14px] rounded-[5px] border-b-[0.5px] border-[#a4a4a4]
                        "
                    />

                    <button
                        onClick={() => {
                            if (appliedCoupon) return;
                            handleApplyCoupon();
                        }}
                    className={`
                        w-full py-2 rounded-lg font-semibold transition
                        ${appliedCoupon
                            ? "border border-dashed border-gray-400 text-gray-400 cursor-default bg-transparent"
                            : "bg-[#FF782D] text-white hover:opacity-60 hover:scale-95 cursor-pointer"
                        }
                    `}
                    >
                    {appliedCoupon ? "Đã áp dụng mã" : "Áp dụng"}
                    </button>

                </div>

                {appliedCoupon && (
                    <p className="text-green-600 text-sm mt-2">
                    Đã áp dụng mã <b>{appliedCoupon.code}</b> (-{appliedCoupon.percent}%)
                    </p>
                )}
            </div>
            
        </div>
    )
}

export default BoxCheckoutPage