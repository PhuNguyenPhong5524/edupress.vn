import { useMemo, useState } from "react";
import { message } from "antd";
import ButtonCheckout from "./ButtonCheckout";

const BoxCheckoutPage = ({ showCart, checkoutCart, setCouponInput, couponInput, setAppliedCoupon, appliedCoupon}) => {
  

   const [messageApi, contextHolder] = message.useMessage();

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
      messageApi.error("Mã khuyến mãi không hợp lệ");
      return;
    }

    setAppliedCoupon({ code, percent });
    setCouponInput("");
    messageApi.success(`Đã áp dụng mã ${code}`);
  };

  // ✅ TÍNH TỔNG TIỀN (THEO DẠNG MỚI)
  const totalOriginalPrice = useMemo(() => {
    if (!Array.isArray(showCart)) return 0;

    return showCart.reduce(
      (total, course) => total + Number(course.price || 0),
      0
    );
  }, [showCart]);

  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    return Math.round((totalOriginalPrice * appliedCoupon.percent) / 100);
  }, [appliedCoupon, totalOriginalPrice]);

  const finalTotal = totalOriginalPrice - couponDiscount;

  return (
   <div>
        {contextHolder}
        <div className="bg-white rounded-xl shadow-sm p-5 h-fit sticky top-24">
            <h3 className="text-[20px] mb-4 text-[#6d6d6d]">Thanh toán</h3>

            <div className="space-y-2">
                <div className="flex justify-between font-semibold">
                    <span>Tạm tính:</span>
                    <span>
                    {totalOriginalPrice === 0 ? (
                        <span className="text-green-500">Free</span>
                    ) : (
                        `${totalOriginalPrice.toLocaleString("vi-VN")} VND`
                    )}
                    </span>
                </div>

                {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                        <span>Giảm ({appliedCoupon.percent}%)</span>
                        <span>-{couponDiscount.toLocaleString("vi-VN")} VND</span>
                    </div>
                )}

                <hr className="my-4 text-gray-300" />

                <div className="flex justify-between text-lg font-bold">
                    <span>Tổng</span>
                    <span className="text-[#c00000]">
                    {finalTotal.toLocaleString("vi-VN")} VND
                    </span>
                </div>
            </div>

            <ButtonCheckout
                showCart={showCart}
                finalTotal={finalTotal}
                checkoutCart={checkoutCart}
                setAppliedCoupon={setAppliedCoupon}
                setCouponInput={setCouponInput}
            />

            <p className="text-xs text-gray-500 mt-1">
                Bạn sẽ không bị tính phí ngay bây giờ
            </p>

            <hr className="my-4 text-gray-300" />

            {/* COUPON */}
            <h3 className="text-lg font-bold">Khuyến mãi</h3>
            <div className="mt-3 flex gap-2">
                <input
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value)}
                    disabled={!!appliedCoupon}
                    placeholder={appliedCoupon ? "Đã áp dụng" : "Mã khuyến mãi..."}
                    className="
                        w-full border-b-[0.5px]  border-b-gray-400 outline-none rounded-[5px] px-2 py-2 
                        
                    "
                />

                <button
                    onClick={() => {
                    if (appliedCoupon) return;
                    handleApplyCoupon();
                    }}
                    className={`
                    w-full py-2 rounded-lg font-semibold transition outline-none
                    ${
                        appliedCoupon
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

export default BoxCheckoutPage;
