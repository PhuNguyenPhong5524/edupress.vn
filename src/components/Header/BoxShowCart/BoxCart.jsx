import { Spin } from "antd";
import { Link } from "react-router";

const BoxShowCart = ({ showCart, isReady, totalOriginalPrice }) => {
    
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
                    <Link
                        to={`/detail/${item.course._id}`}
                        className="text-sm font-semibold line-clamp-2 text-[#000000] hover:text-[#FF782D]"
                    >
                        {item.course.course_title}        
                    </Link>

                    <div className="flex items-center justify-between ">
                        <p className="text-[12px] text-gray-400 ">
                            {item.course.total_lectures} bài giảng
                        </p>

                        <span className="text-[#000000] text-[14px] font-semibold">
                            {  totalOriginalPrice === 0   
                                ? <span className="text-green-400 font-semibold">Free</span>
                                : `${Number(totalOriginalPrice).toLocaleString('vi-VN')} VND`
                            }
                        </span>
                    </div>
                </div>
            </div>
        ))}
        </div>
    );
};

export default BoxShowCart;
