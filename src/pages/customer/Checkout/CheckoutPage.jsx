
import { useEffect, useMemo, useRef } from "react";
import useFetchData from "../../../api/useFetchData";
import useAuth from "../../../hooks/useAuth";
import BoxQR from "./BoxQR/BoxQR";
import { Link, useSearchParams } from "react-router-dom";
import BoxCheckoutInfo from "./BoxCheckoutInfo/BoxCheckoutInfo";
import { Spin } from "antd";
import ArrowRightIcon from "../../../components/icons/ArrowRightIcon";
import BoxShowCheckout from "./BoxShowCheckout/BoxShowCheckout";


const CheckoutPage = () => {
    
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const { user } = useAuth();
    const { data: checkout} = useFetchData(`checkout`);
    const { data: course} = useFetchData(`courses`);   


    const checkoutCart = useMemo(() => {
        if (!checkout || !user) return null;

        return checkout.find(
            item =>
            item.token === token &&
            item.user_id === user.id
        );
    }, [checkout, user, token]);


    const loadings = !course.length || !checkout.length;


    return (
        <div className="mt-[90px]  max-w-[1080px] mx-auto">
            <div className="w-full bg-gray-50 h-screen">
                {
                    loadings || !checkoutCart ? (
                        <div className="animate-pulse w-full z-2000 absolute top-0 left-0 h-screen flex items-center justify-center">
                            <Spin fullscreen size="large" />
                        </div>
                    ) : checkoutCart.status === "pending" ||
                    checkoutCart.status === "cancelled" ? (
                        <BoxShowCheckout
                            checkoutCart={checkoutCart}
                            course={course}
                            user={user}
                        />
                    ) : checkoutCart.status === "paid" ? (
                        <div className="bg-white rounded-2xl shadow-lg">
                            a
                        </div>
                    ) : null
                }     
            </div>
        </div>
    )
};

export default CheckoutPage;