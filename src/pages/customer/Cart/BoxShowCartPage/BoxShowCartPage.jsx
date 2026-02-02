import { Spin } from "antd";
import BoxCartItem from "./BoxCartItem";


const BoxShowCartPage = ({ 
    showSpin, 
    showCart, 
    showNameProvider
}) => {

    return (
        <div>
            {
                showSpin ? (
                    <div className="flex justify-center py-20">
                        <Spin size="large" />
                    </div>
                    ) : showCart.length === 0 ? (
                        <p className="text-center text-gray-500 py-20">
                            Chưa có khóa học trong giỏ
                        </p>
                    ) : (
                    <div className="space-y-4">
                        {
                            showCart.map(item => (
                                <BoxCartItem key={item._id} item={item} showNameProvider={showNameProvider} />
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
};

export default BoxShowCartPage;