import { Spin } from "antd";
import BoxCheckoutInfo from "../BoxCheckoutInfo/BoxCheckoutInfo";
import BoxQR from "../BoxQR/BoxQR";




const BoxShowCheckout = ({checkoutCart, course, user}) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr] gap-6 p-6">
            
            {/* LEFT - ORDER INFO */}
                <div className="space-y-6">
                    <h1 className=" text-[14px] md:text-[16px] lg:text-[18px] font-bold text-gray-800">
                        Thanh toán khóa học
                    </h1>
                    {
                         checkoutCart?.status === "pending" && (
                            <BoxCheckoutInfo
                                checkoutCart={checkoutCart}
                                course={course}
                                user={user}
                            />
                         )
                    }
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-700">
                        ⏳ Vui lòng quét mã QR để hoàn tất thanh toán.
                        Trang sẽ tự động cập nhật khi thanh toán thành công.
                    </div>
                </div>

            {/* RIGHT - QR */}
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="bg-white p-4 rounded-xl border-[1px] border-gray-300">
                        <BoxQR
                            checkoutCart={checkoutCart}
                        />
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-500">
                            Quét mã để thanh toán khóa học!
                        </p>
                    </div>

                    {/* STATUS */}
                    <div className="flex flex-col gap-4">
                        
                        {
                            checkoutCart?.status === "pending" && (
                                <div className="flex items-center gap-3 text-blue-600 font-medium">
                                    <span className="relative inline-flex w-3 h-3">
                                    <span className="absolute inline-flex w-3 h-3 rounded-full bg-blue-600 animate-ping"></span>
                                    <span className="relative inline-flex w-3 h-3 rounded-full bg-blue-600"></span>
                                    </span>
                                    <span>Chưa thanh toán</span>
                                </div>
                            )
                        }

                        {
                            checkoutCart?.status === "paid" && (
                                <div className="flex items-center gap-3 text-green-600 font-medium">
                                    <span className="relative inline-flex w-3 h-3">
                                    <span className="absolute inline-flex w-3 h-3 rounded-full bg-green-600 animate-ping"></span>
                                    <span className="relative inline-flex w-3 h-3 rounded-full bg-green-600"></span>
                                    </span>
                                    <span>Đã thanh toán</span>
                                </div>
                            )
                        }

                        {
                            checkoutCart?.status === "pending" && (
                                <button 
                                    className="
                                        text-[12px] md:text-[14px] lg:text-[16px] font-semibold flex justify-center border-[1px] border-red-500 border-dashed
                                            text-red-500 rounded-[5px] w-full  items-center h-[40px] transform transition-all duration-300 ease-in-out
                                            hover:bg-red-500 hover:text-white cursor-pointer hover:scale-95
                                        
                                    "
                                >
                                    Hủy đơn
                                </button>
                            )
                        }
                        {/* {
                            checkoutCart?.status === "paid" && (
                                <Link
                                    to={`/checkout-history`}
                                    className="
                                        text-[12px] md:text-[14px] lg:text-[16px] font-semibold flex justify-center border-[1px] border-gray-500 border-dashed
                                            text-gray-500 rounded-[5px] w-full  items-center h-[40px] transform transition-all duration-300 ease-in-out 
                                            hover:bg-gray-500 hover:text-white cursor-pointer hover:scale-95
                                    "
                                >
                                    <ArrowRightIcon size={20} />
                                    Lịch sử khóa học
                                </Link>
                            )
                        } */}
                    </div>
                </div>
        </div>
    )
};

export default BoxShowCheckout;