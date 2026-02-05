import { useMemo } from "react";
import BoxShowCoursesCheckout from "./BoxShowCourseCheckout";
import { useCartStore } from "../../../../stores/cart.store";


const BoxCheckoutInfo = ({user, checkoutCart}) => {

    const {cart} =  useCartStore();
     const showCheckout = useMemo(() => {
        if (!cart?.courses) return [];

        return cart.courses.map(item => ({
            course_id: item.course_id,
            course_title: item.course_title,
            price: item.price,
            image_url: item.image_url,
            total_lectures: item.total_lectures
        }));
    }, [cart]);

    return (
        <div className=" text-gray-600">
            <div className="flex justify-between mb-3">
                <span className="text-[12px] md:text-[14px] lg:text-[16px] font-sans text-[#b3b3b3]">Học viên</span>
                <span className="font-medium text-gray-800">
                    {user.username}
                </span>
            </div>

            <div>
                <div className="flex justify-between mb-3">
                    <span className="text-[12px] md:text-[14px] lg:text-[16px] font-sans text-[#b3b3b3]">Khóa học</span>
                    <span className="font-medium text-gray-800">
                        ({showCheckout.length})khóa học
                    </span>
                </div>
                <div className="flex flex-col gap-3">
                    {
                        showCheckout.length > 0 && showCheckout?.map(item => (
                            <BoxShowCoursesCheckout key={item.course_id} item={item} />
                        ))  
                    }
                </div>
            </div>

            <div className="flex justify-between my-3">
                <span className="text-[12px] md:text-[14px] lg:text-[16px] font-sans text-[#b3b3b3]">Mã đơn</span>
                <span className="font-medium text-gray-800">
                    {checkoutCart._id}    
                </span>
            </div>
            <div className="border-t pt-3 flex justify-between my-3">
                <span className="text-[12px] md:text-[14px] lg:text-[16px] font-sans text-[#b3b3b3]">Giảm giá</span>
                    {checkoutCart.coupon && (
                        <span className="font-medium text-green-600">
                            {checkoutCart.coupon.code} (-{checkoutCart.coupon.percent}%)
                        </span>
                    )}
            </div>
            <div className=" flex justify-between text-base">
                <span className="font-bold text-[#000000]">Tổng tiền</span>
                <span className="font-bold text-[14px] md:text-[16px] lg:text-[18px] text-red-600">
                    {Number(checkoutCart.total).toLocaleString("vi-VN")} VND
                </span>
            </div>
        </div>
    )
}

export default BoxCheckoutInfo;