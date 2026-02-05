
import BoxQR from "./BoxQR/BoxQR";



const CheckoutPage = () => {
    
    return (
        <div className="mt-[80px]  max-w-[1080px] mx-auto">
            <div className="w-full bg-gray-50 p-4 md:p-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* LEFT - ORDER INFO */}
                        <div className="space-y-6">
                            <h1 className="text-2xl font-bold text-gray-800">
                                Thanh toán khóa học
                            </h1>

                            <div className="space-y-3 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>Học viên</span>
                                    <span className="font-medium text-gray-800">
                                        Nguyễn Văn A
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Khóa học</span>
                                    <span className="font-medium text-gray-800">
                                        ReactJS Nâng Cao
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Mã đơn</span>
                                    <span className="font-medium text-gray-800">
                                        #CHK-10293
                                    </span>
                                </div>

                                <div className="border-t pt-3 flex justify-between text-base">
                                    <span className="font-semibold">Tổng tiền</span>
                                    <span className="font-bold text-green-600">
                                        1.200.000đ
                                    </span>
                                </div>
                            </div>

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