import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Spin } from "antd";

import useAuth from "../../../hooks/useAuth";
import { useCheckoutStore } from "../../../stores/checkout.store";
import BoxShowCheckout from "./BoxShowCheckout/BoxShowCheckout";

const CheckoutPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const {
    currentCheckout,
    loading,
    fetchCheckoutByToken,
  } = useCheckoutStore();

  // 🔄 fetch checkout theo token
  useEffect(() => {
    if (token) {
      fetchCheckoutByToken(token);
    }
  }, [token, fetchCheckoutByToken]);

  // ⏳ loading
  if (loading) {
    return (
      <div className="h-screen">
        <Spin fullscreen tip="Đang xử lý đơn hàng..." />
      </div>
    );
  }

  // ❌ không tìm thấy đơn
  if (!currentCheckout) {
    return (
      <div className="mt-[90px] max-w-[1080px] mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          ❌ Đơn hàng không tồn tại hoặc đã hết hạn
        </div>
      </div>
    );
  }
  // ✅ render theo status
  return (
    <div className="mt-[90px] max-w-[1080px] mx-auto h-screen">
      <div className="w-full  bg-gray-50 h-screen">

        {currentCheckout.status === "pending" && (
          <BoxShowCheckout
            currentCheckout={currentCheckout}
          />
        )}

        {currentCheckout.status === "paid" && (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
            ✅ Thanh toán thành công
          </div>
        )}

        {currentCheckout.status === "cancelled" && (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
            ❌ Đơn hàng đã bị huỷ
          </div>
        )}

      </div>
    </div>
  );
};

export default CheckoutPage;
