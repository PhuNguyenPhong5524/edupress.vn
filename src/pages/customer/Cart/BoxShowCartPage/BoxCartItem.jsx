

const BoxCartItem = ({ item, showNameProvider }) => {
    return (
        <div
            key={item._id}
            className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row gap-4"
        >
            {/* IMAGE */}
                <img
                    src={item.course.image_url}
                    alt={item.course.course_title}
                    className="w-full sm:w-48 h-28 object-cover rounded-lg"
                />

            {/* INFO */}
                <div className="flex-1">
                    <h2 className="font-bold text-[16px] leading-snug">
                        {item.course.course_title}
                    </h2>

                    <p className="text-sm text-[#000000] py-1">
                        Giảng viên: <span className="font-semibold text-[#ff9a1e]">{showNameProvider?.provider_name} </span>   
                    </p>

                    <div className="flex flex-wrap gap-3 text-sm text-gray-600 mt-2">
                        <p className="text-[12px] text-[#848484]">
                            <strong className="text-[#000000] pr-1">• {item.course.total_sections}</strong> 
                            phần
                        </p>
                        <p className="text-[12px] text-[#848484]">
                            <strong className="text-[#000000] pr-1">• {item.course.total_lectures}</strong> 
                            bài học
                        </p>
                        <p className="text-[12px] text-[#848484]">
                            • Tất cả cấp độ
                        </p>
                    </div>

                    <button className="text-sm text-red-500 mt-3 hover:underline">
                        Xóa khỏi giỏ
                    </button>
                </div>

            {/* PRICE */}
                <div className="text-right min-w-[120px]">
                    <div className="text-lg font-bold text-[#ff2a00]">
                        ${Number(item.course.price).toLocaleString('vi-VN')} VND
                    </div>
                    <div className="text-sm text-gray-400 line-through">
                    
                    </div>
                </div>
        </div>
    )
};

export default BoxCartItem;