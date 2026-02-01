import { Spin } from "antd";

const BoxShowCart = ({ showCart, isReady }) => {
    
    if (!isReady) {
        return (
        <div className="p-4 text-center text-gray-400 flex flex-col justify-center items-center gap-2">
            <Spin size="large" />
            Đang tải giỏ hàng...
        </div>
        );
    }

    if (showCart.length === 0) {
        return (
        <div className="p-4 text-center text-gray-400">
            Chưa có khóa học trong giỏ
        </div>
        );
    }   

    return (
        <div className="p-4 space-y-4">
        {showCart.map(item => (
            <div key={item.id} className="flex gap-3">
            <img
                src={item.course.image_url}
                alt={item.course.course_title}
                className="w-[60px] h-[60px] rounded-lg object-cover"
            />

            <div>
                <p className="font-semibold text-[15px] line-clamp-1 hover:text-[#FF782D] cursor-pointer">
                {item.course.course_title}
                </p>
                <p className="text-sm text-gray-500 line-clamp-2">
                {item.course.description}
                </p>
            </div>
            </div>
        ))}
        </div>
    );
};

export default BoxShowCart;
