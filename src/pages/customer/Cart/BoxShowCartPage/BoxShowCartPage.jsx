import { Spin } from "antd";
import BoxCartItem from "./BoxCartItem";


const BoxShowCartPage = ({ 
    showSpin, 
    showCart, 
    showNameProvider,
    user,
    removeFromCart
}) => {

    return (
        <div className="relative">
            {
                showSpin ? (
                    <div className="flex justify-center py-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                        <Spin size="large" />
                    </div>
                    ) : showCart.length === 0 ? (
                        <p className="text-center text-gray-500 py-20 absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-[-10%]">
                            <div className="">
                                <img src="/images/cart-img.png" alt="empty-cart" />
                                <span className="text-[16px] font-semibold">Chưa có khóa học trong giỏ hàng</span>
                            </div>
                        </p>
                    ) : (
                    <div className="space-y-4">
                        {
                            showCart.map(item => (
                                <BoxCartItem 
                                    key={item._id} 
                                    item={item} 
                                    showNameProvider={showNameProvider} 
                                    user={user}
                                    removeFromCart={removeFromCart}
                                />
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
};

export default BoxShowCartPage;