
import { useEffect, useMemo, useRef } from "react";
import useFetchData from "../../../api/useFetchData";
import useAuth from "../../../hooks/useAuth";
import { useSearchParams } from "react-router-dom";
import { Spin } from "antd";
import BoxShowCheckout from "./BoxShowCheckout/BoxShowCheckout";
import useFetchCheckout from "../../../api/useFetchCheckout";



const CheckoutPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { user } = useAuth();

  const {
    checkoutList,
    loadingCheckout,
    refetchCheckout,
  } = useFetchCheckout();

  const { data: course } = useFetchData("courses");

  // 🔥 REFRESH CHECKOUT KHI CÓ TOKEN
  useEffect(() => {
    if (!token) return;
    refetchCheckout();
  }, [token, refetchCheckout]);

  const checkoutCart = useMemo(() => {
    if (!checkoutList.length || !user) return null;

    return checkoutList.find(
      item => item.token === token && item.user_id === user.id
    );
  }, [checkoutList, user, token]);

  const loading = loadingCheckout || !course.length;
  if (loading) {
  return (
    <div className="animate-pulse w-full absolute top-0 left-0 h-screen flex items-center justify-center">
      <Spin fullscreen size="large" />
    </div>
  );
}

if (!checkoutCart) {
  return (
    <div className="mt-[90px] max-w-[1080px] mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
        ❌ Đơn hàng không tồn tại hoặc đã hết hạn
      </div>
    </div>
  );
}

  return (
    <div className="mt-[90px] max-w-[1080px] mx-auto">
      <div className="w-full bg-gray-50 h-screen">
        {
            checkoutCart.status === "pending" ? (
                <BoxShowCheckout
                    checkoutCart={checkoutCart}
                    course={course}
                    user={user}
                />
            ) : checkoutCart.status === "paid" ? (
                <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
                    ✅ Thanh toán thành công
                </div>
            ) : checkoutCart.status === "cancelled" ? (
                <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
                    ❌ Đơn hàng đã bị huỷ
                </div>
            ) : null
        }

      </div>
    </div>
  );
};

export default CheckoutPage;