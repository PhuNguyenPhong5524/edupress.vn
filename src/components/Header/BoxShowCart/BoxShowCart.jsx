import { Link } from "react-router-dom"
import BoxCart from "./BoxCart"
import { useMemo } from "react";

const BoxShowCart = ({cart, cartLoading, loadingCourse, courses}) => {
    const isLoading = cartLoading || loadingCourse;
    const isReady = courses !== null && !isLoading;

    const showCart = useMemo(() => {
        if (!isReady || cart.length === 0 || !Array.isArray(courses)) return [];

        const courseMap = Object.fromEntries(
        courses.map(c => [c._id, c])
    );

    return cart
        .map(item => ({
            ...item,
            course: courseMap[item.course_id],
        }))
        .filter(item => item.course);
    }, [cart, courses, isReady]);

    const totalOriginalPrice = useMemo(() => {
        if (!Array.isArray(showCart)) return 0;

        return showCart.reduce((total, item) => {
            return total + (item.course?.price ?? 0);
        }, 0);
    }, [showCart]);

    return (
        <div
            className="
                absolute right-0 top-full mt-3 w-[300px] bg-white rounded-xl border border-[#EAEAEA]
                shadow-xl opacity-0 invisible translate-y-2 scale-95 transition-all duration-200 ease-out
                origin-top group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 
                group-hover:scale-100 z-50
            "
        >
            {/* Box Cart */}
                <BoxCart 
                    showCart={showCart}
                    isReady={isReady}
                    totalOriginalPrice={totalOriginalPrice}
                />
            <div className="border-t px-4 py-3 text-center ">
                <p className="text-lg font-semibold">
                    Tổng: 
                    <span className="text-[#000000] font-semibold pl-2">
                        {  totalOriginalPrice === 0   
                            ? <span className="text-green-400 font-semibold">Free</span>
                            : `${Number(totalOriginalPrice).toLocaleString('vi-VN')} VND`
                        }
                    </span>
                </p>
                <p className="text-sm text-gray-500">{showCart.length} khóa học</p>
                <Link
                    to={`/cart`}
                    className="
                        mt-3 w-full h-[44px] rounded-lg bg-[#FF782D] flex items-center justify-center
                    text-white font-semibold hover:bg-[#FF782D]/80 transition text-center
                    "
                >
                    Chuyển đến giỏ hàng
                </Link>
            </div>
        </div>
    )
}

export default BoxShowCart