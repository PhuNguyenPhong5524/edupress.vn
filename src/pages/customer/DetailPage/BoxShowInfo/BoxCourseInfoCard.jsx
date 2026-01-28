
import CircleCheckIcon from "../../../../components/icons/CircleCheckIcon";
import PlayIcon from "../../../../components/icons/PlayIcon";

const BoxCourseInfoCard = ({showList}) => {
    return (
        <div
            className={
                `
                 bg-white text-gray-800 rounded-[10px] shadow-xl p-4 transition-all duration-500 border-[0.5px] border-[#EAEAEA] 
                `
            }
        >
            {
                showList && (
                   <div className="w-full">
                        {/* IMAGE + PREVIEW */}
                            <div className="relative group overflow-hidden rounded-lg w-full">
                                <img
                                src={showList.image_url}
                                alt={showList.course_title}
                                className="
                                    w-full h-auto lg:h-[200px] object-cover transition-transform duration-300 ease-in-out
                                    group-hover:scale-110
                                "
                                />

                                {/* Overlay play */}
                                <div
                                className="
                                    absolute inset-0
                                    flex flex-col items-center justify-center gap-2
                                    bg-black/30 opacity-100
                                    transition-opacity duration-300
                                "
                                >
                                <button
                                    type="button"
                                    className="
                                    bg-white w-[48px] h-[48px]
                                    rounded-full flex items-center justify-center
                                    border-2 border-white text-[#FF782D]
                                    hover:bg-[#FF782D] hover:text-white
                                    transition-all duration-300 hover:scale-110
                                    "
                                >
                                    <PlayIcon size={22} />
                                </button>

                                <span className="text-[14px] md:text-[15px] font-semibold text-white underline">
                                    Xem trước khóa học
                                </span>
                                </div>
                            </div>

                        {/* PRICE */}
                            <div className="mt-3">
                                {showList.price === 0 ? (
                                <span className="text-green-400 font-semibold text-[18px]">
                                    Free
                                </span>
                                ) : (
                                <div className="text-[24px] md:text-[28px] text-red-600 font-bold">
                                    {Number(showList.price).toLocaleString("vi-VN")}
                                    <span className="text-[16px] underline align-super">đ</span>
                                </div>
                                )}
                            </div>

                        {/* BUTTONS */}
                            <div className="flex flex-col sm:flex-row gap-3 mt-3">
                                <button
                                className="
                                    w-full bg-[#FF782D] text-white py-2 rounded-md
                                    transition-all duration-300
                                    hover:opacity-80 hover:scale-[0.97]
                                "
                                >
                                Thêm giỏ hàng
                                </button>

                                <button
                                className="
                                    w-full border border-[#FF782D] text-[#FF782D] py-2 rounded-md
                                    transition-all duration-300
                                    hover:bg-[#FF782D] hover:text-white
                                "
                                >
                                Đăng ký khóa học
                                </button>
                            </div>

                        {/* FOOTER */}
                            <p className="mt-3 flex items-center gap-1 text-[12px] text-gray-400">
                                <CircleCheckIcon size={16} className="text-[#FF782D]" />
                                <span>Truy cập trọn đời · Chứng nhận</span>
                            </p>
                    </div>

                )
            }
        </div>
    )
}

export default BoxCourseInfoCard;