import { Link } from "react-router";
import PopopConfirm from "../../Cart/PopopConfirm/PopopConfirm";
import { useCartStore } from "../../../../stores/cart.store";

const BoxCartItem = ({ course, user, showNameProvider }) => {
  const { removeFromCart, cart } = useCartStore();

  const handleRemoveFromCart = () => {
    if (!user?.id) return;

    // tìm cartItem chứa course này
    const cartItem = cart?.courses?.find(
      c => c.course_id === course._id
    );

    if (!cartItem) return;

    removeFromCart(cartItem._id, user.id);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex gap-4">
      {/* IMAGE */}
      <img
        src={course.image_url}
        alt={course.course_title}
        className="w-48 h-28 object-cover rounded-lg"
      />

      {/* INFO */}
      <div className="flex-1">
        <Link
          to={`/detail/${course._id}`}
          className="font-bold text-[16px] leading-snug"
        >
          {course.course_title}
        </Link>
        {showNameProvider && (
            <p className="text-sm">
              Giảng viên:{" "}
              <span className="font-semibold text-[#ff9a1e]">
                {showNameProvider.provider_name}
              </span>
            </p>
          )}
        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mt-2">
          <p className="text-[12px]">
            <strong>{course.total_sections}</strong> phần
          </p>
          <p className="text-[12px]">
            <strong>{course.total_lectures}</strong> bài học
          </p>
          <p className="text-[12px]">Tất cả cấp độ</p>
        </div>

        <PopopConfirm handleRemoveFromCart={handleRemoveFromCart} />
      </div>

      {/* PRICE */}
      <div className="text-right min-w-[120px]">
        <div className="text-lg font-bold text-[#ff2a00]">
          {Number(course.price).toLocaleString("vi-VN")} VND
        </div>
      </div>
    </div>
  );
};

export default BoxCartItem;