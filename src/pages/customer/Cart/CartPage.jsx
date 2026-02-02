import { useEffect, useMemo, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useCartStore } from "../../../stores/cart.store";
import useFetchData from "../../../api/useFetchData";
import { Spin } from "antd";
import BoxShowCart from "../../../components/Header/BoxShowCart/BoxCart";
import BoxShowCartPage from "./BoxShowCartPage/BoxShowCartPage";
import BoxCheckoutPage from "./BoxCheckoutPage/BoxCheckoutPage";


const CartPage = () => {
    const { user } = useAuth();
    const { cart, loading: cartLoading, fetchCart } = useCartStore();
    const { data: course, loading: courseLoading } = useFetchData("courses");
    const { data: provider } = useFetchData("providers");

    /* ================= FETCH CART ================= */
    useEffect(() => {
        if (user?.id) {
            fetchCart(user.id);
        }
    }, [user?.id, fetchCart]);

    const [showSpin, setShowSpin] = useState(true);

    const isLoading = cartLoading || courseLoading;
    useEffect(() => {
        if (!isLoading) {
            const t = setTimeout(() => setShowSpin(false), 400);
            return () => clearTimeout(t);
        } else {
            setShowSpin(true);
        }
    }, [isLoading]);

    // Loading
    const isReady = course !== null && !isLoading;

    const userCart = useMemo(() => {
        if (!user?.id) return [];
        return cart.filter(item => item.user_id === user.id);
    }, [cart, user?.id]);

    const showCart = useMemo(() => {
        if (!isReady || userCart.length === 0 || !Array.isArray(course)) return [];

        const courseMap = Object.fromEntries(
            course.map(c => [c._id, c])
        );

        return userCart
            .map(item => ({
                ...item,
                course: courseMap[item.course_id],
            }))
            .filter(item => item.course);
    }, [userCart, course, isReady]);

    const showNameProvider = useMemo(() => {
        return provider.find(item => item.id === showCart[0]?.course.provider_id);
    })

    return (
        <div className="mt-[60px] max-w-[1080px] mx-auto px-[15px] lg:px-0">
             <div className=" bg-gray-50 pt-8">
                <div className="max-w-[1080px] mx-auto ">
                    <h1 className="text-2xl font-bold mb-3">🛒 Giỏ hàng</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* LEFT */}
                            <div className="lg:col-span-2 space-y-4">
                                <BoxShowCartPage
                                    showSpin={showSpin}
                                    showCart={showCart}
                                    showNameProvider={showNameProvider}
                                />
                            </div>

                        {/* RIGHT */}
                            <BoxCheckoutPage 
                                showCart={showCart}
                            />
                    </div>
                </div>
                </div>
        </div>
        );

}

export default CartPage;