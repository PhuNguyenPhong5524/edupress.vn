import { Spin } from "antd";
import BoxCartItem from "./BoxCartItem";


const BoxShowCartPage = ({ showSpin, showCart, user, showNameProvider }) => {
  return (
    <div className="relative">
      {showSpin ? (
        <div className="flex justify-center py-20">
          <Spin size="large" />
        </div>
      ) : showCart.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          <img src="/images/cart-img.png" alt="empty-cart" className="mx-auto mb-3" />
          <span className="text-[16px] font-semibold">
            Chưa có khóa học trong giỏ hàng
          </span>
        </div>
      ) : (
        <div className="space-y-4">
          {showCart.map(course => (
            <BoxCartItem
              key={course._id}
              course={course}
              user={user}
              showNameProvider={showNameProvider}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BoxShowCartPage;
