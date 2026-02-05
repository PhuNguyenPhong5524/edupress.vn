
import { use, useMemo } from "react";
import useFetchData from "../../../api/useFetchData";
import useAuth from "../../../hooks/useAuth";
import BoxQR from "./BoxQR/BoxQR";
import { useSearchParams } from "react-router-dom";
import BoxCheckoutInfo from "./BoxCheckoutInfo/BoxCheckoutInfo";



const CheckoutPage = () => {
    
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const { user } = useAuth();
    const { data: checkout } = useFetchData(`checkout`);
    const { data: course } = useFetchData(`courses`);    
    const checkoutCart = useMemo(() => 
        checkout?.find(item => 
            item.token === token &&
            item.user_id === user.id &&
            item.status === "pending"
        ), 
        [checkout, token]
    );
    return (
        <div className="mt-[90px] max-w-[1080px] mx-auto">
            <div className="w-full bg-gray-50 ">
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* LEFT - ORDER INFO */}
                        <div className="space-y-6">
                            <h1 className="text-2xl font-bold text-gray-800">
                                Thanh toán khóa học
                            </h1>
                            {
                                !checkoutCart ? (
                                    <div>
                                        Không tìm thấy khóa học....
                                    </div>
                                ) : (
                                    <BoxCheckoutInfo user={user} checkoutCart={checkoutCart} course={course}  />
                                )
                            }
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-700">
                                ⏳ Vui lòng quét mã QR để hoàn tất thanh toán.
                                Trang sẽ tự động cập nhật khi thanh toán thành công.
                            </div>
                        </div>

                    {/* RIGHT - QR */}
                        <div className="flex flex-col items-center justify-center space-y-6">
                            <div className="bg-white p-4 rounded-xl border">
                                <BoxQR
                    
                                />
                            </div>

                            <div className="text-center space-y-2">
                                <p className="text-sm text-gray-500">
                                    Quét bằng camera hoặc app ngân hàng
                                </p>
                                <p className="text-xs text-gray-400 break-all">
                                    Token: 
                                </p>
                            </div>

                            {/* STATUS */}
                            <div className="flex items-center gap-2 text-blue-600 font-medium">
                                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                                    Đang chờ thanh toán
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
};

export default CheckoutPage;