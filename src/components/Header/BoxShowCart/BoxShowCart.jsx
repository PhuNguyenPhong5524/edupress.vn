    import { Link } from "react-router-dom"
    import BoxCart from "./BoxCart"
    import { useMemo } from "react";

    const BoxShowCart = ({cart, cartLoading, loadingCourse}) => {
        const isLoading = cartLoading || loadingCourse;
        const showCart = useMemo(() => {
            if (!cart?.courses) return [];

            return cart.courses.map(item => ({
                course_id: item.course_id,
                course_title: item.course_title,
                price: item.price,
                image_url: item.image_url,
                total_lectures: item.total_lectures
            }));
        }, [cart]);

        const totalPrice = useMemo(() => {
            return showCart.reduce(
                (sum, c) => sum + Number(c.price || 0),
                0
            );
        }, [showCart]);
        


        return (
            <div
                className={`
                    ${showCart.length === 0 ? 'h-[200px]' : ''}
                    ${showCart.length === 1 ? 'h-[230px]' : ''}
                    ${showCart.length > 1 ? 'h-[310px]' : ''}
                    absolute right-0 top-full mt-3 w-[300px] bg-white rounded-xl border border-[#EAEAEA]
                    shadow-xl opacity-0 invisible translate-y-2 scale-95 transition-all duration-200 ease-out
                    origin-top group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 hidden lg:block
                    group-hover:scale-100 z-50 overflow-hidden    
                `}
            >
                {/* Box Cart */}
                    <BoxCart    
                        showCart={showCart}
                        isReady={!isLoading}
                    />
                <div className="border-t border-[#EAEAEA] px-4 py-3 text-center ">
                    <p className="text-lg font-semibold">
                        Tổng: 
                           {
                                !showCart.length ? " 0" : totalPrice === 0 ? (
                                    <span className="text-green-500">Free</span>
                                ):(
                                    ` ${totalPrice.toLocaleString("vi-VN")} VND`
                                )
                            }
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