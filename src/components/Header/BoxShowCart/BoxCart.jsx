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
        <div className="p-4 text-center text-gray-400 flex justify-center items-center  h-[70px]">
            <span 
                className={`
                    ${showCart.length === 0 ? 'h-[40px]' : ''}
                    text-[14px] font-semibold border border-gray-300 w-full
                    border-dashed flex flex-col justify-center items-center    
                `}
            >
                Chưa có khóa học trong giỏ
            </span>
        </div>
        );
    }   

    return (
        <div className={`${showCart.length === 1 ? 'h-[100px]' : 'h-[180px]'} p-4 space-y-4 overflow-y-auto`}>
        {showCart.map(item => (
            <div key={item._id} className="flex gap-3">
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
                            {  item.course.price === 0   
                                ? <span className="text-green-400 font-semibold">Free</span>
                                : `${Number(item.course.price).toLocaleString('vi-VN')} VND`
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
