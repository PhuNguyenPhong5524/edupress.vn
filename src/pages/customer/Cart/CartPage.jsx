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
    const { cart, loading: cartLoading, fetchCart, clearCartByUser } = useCartStore();
    const { data: course, loading: courseLoading } = useFetchData("courses");
    const { data: provider } = useFetchData("providers");

    /* ================= FETCH CART ================= */
   

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

    useEffect(() => {
        if (user?.id) {
            fetchCart(user.id);
        }
    }, [user?.id]);
    
    
    const showCart = useMemo(() => {
        if (!cart || !Array.isArray(course)) return [];

        const courseMap = Object.fromEntries(
            course.map(c => [c._id, c])
        );

        return cart.courses
            .map(item => courseMap[item.course_id])
            .filter(Boolean);
    }, [cart, course]);

    const totalPrice = useMemo(() => {
        return showCart.reduce(
            (sum, c) => sum + Number(c.price || 0),
            0
        );
    }, [showCart]);
    

    const showNameProvider = useMemo(() => {
        if (!showCart.length || !provider) return null;

        const providerId = showCart[0].provider_id;
        return provider.find(p => p.id === providerId) || null;
    }, [showCart, provider]);

    return (
        <div className="mt-[60px] max-w-[1080px] mx-auto px-[15px] lg:px-0">
            <div className=" bg-gray-50 pt-8">
                <div className="max-w-[1080px] mx-auto ">
                    <h1 className="text-2xl font-bold mb-3">🛒 Giỏ hàng</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* LEFT */}
                            <div className="lg:col-span-2 space-y-4 py-2 px-4 shadow-xl border border-gray-300 border-dashed rounded-[10px]">
                                <BoxShowCartPage
                                    showSpin={showSpin}
                                    showCart={showCart}
                                    user={user}
                                    showNameProvider={showNameProvider}
                                />
                            </div>

                        {/* RIGHT */}
                            <BoxCheckoutPage 
                                showCart={showCart}
                                totalPrice={totalPrice}
                                clearCartByUser={clearCartByUser}
                            />
                    </div>
                </div>
            </div>
        </div>
        );

}

export default CartPage;