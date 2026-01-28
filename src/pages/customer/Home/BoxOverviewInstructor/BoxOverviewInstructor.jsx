
import ButtonView from "../../../../components/buttons/ButtonViewCourse";

const BoxOverviewInstructor = () => {
    return (
        <section className="">
            {/* ===== Box tổng quan ===== */}
            <div className="
                grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
                gap-[15px] lg:gap-[20px]
            ">
                <div className="bg-[#F5F5F5] h-[160px] md:h-[180px] rounded-[20px] flex flex-col justify-center items-center">
                    <h2 className="text-[#FF782D] text-[28px] md:text-[32px] font-semibold">🎓 50.000+</h2>
                    <p className="text-[16px] md:text-[18px] font-medium">Học viên</p>
                </div>

                <div className="bg-[#F5F5F5] h-[160px] md:h-[180px] rounded-[20px] flex flex-col justify-center items-center">
                    <h2 className="text-[#FF782D] text-[28px] md:text-[32px] font-semibold">📚 120+</h2>
                    <p className="text-[16px] md:text-[18px] font-medium">Khóa học</p>
                </div>

                <div className="bg-[#F5F5F5] h-[160px] md:h-[180px] rounded-[20px] flex flex-col justify-center items-center">
                    <h2 className="text-[#FF782D] text-[28px] md:text-[32px] font-semibold">👨‍🏫 35+</h2>
                    <p className="text-[16px] md:text-[18px] font-medium">Giảng viên giỏi</p>
                </div>

                <div className="bg-[#F5F5F5] h-[160px] md:h-[180px] rounded-[20px] flex flex-col justify-center items-center">
                    <h2 className="text-[#FF782D] text-[28px] md:text-[32px] font-semibold">🌟 100%</h2>
                    <p className="text-[16px] md:text-[18px] font-medium">Hài lòng học viên</p>
                </div>
            </div>

            {/* ===== Box nội dung ===== */}
            <div className="
                flex flex-col lg:flex-row gap-[30px] lg:gap-[60px]
                mt-[30px] items-center
            ">
                <div className="w-full lg:w-1/2 flex justify-center border-[1px] border-[#EAEAEA] rounded-[20px]">
                    <img
                        src="/images/banner-overviewInstr.png"  
                        alt="Tổng quan EduPress"
                        className="w-[90%] md:w-[70%] lg:w-full h-auto"
                    />
                </div>

                <div 
                    className="
                        w-full lg:w-1/2 text-center lg:text-left border-[1px] p-[10px] border-[#EAEAEA] rounded-[20px]
                         md:border-none md:rounded-none flex flex-col gap-[20px]
                    "
                >
                    <h2 className="text-[24px] md:text-[28px] lg:text-[32px] font-semibold">
                        Trở thành giảng viên trên EduPress
                    </h2>

                    <p className="text-[16px] md:text-[18px] text-[#555555] ">
                        EduPress là nền tảng giúp bạn chia sẻ kiến thức, xây dựng thương hiệu cá nhân
                        và tạo thu nhập bền vững thông qua các khóa học trực tuyến chất lượng cao.
                    </p>

                    <div className="space-y-[12px] text-left md:text-center lg:text-left">
                        <p className="text-[16px] md:text-[18px]">✅ Đăng tải và quản lý khóa học dễ dàng.</p>
                        <p className="text-[16px] md:text-[18px]">✅ Tiếp cận hàng nghìn học viên tiềm năng.</p>
                        <p className="text-[16px] md:text-[18px]">✅ Chủ động thời gian giảng dạy và nội dung.</p>
                        <p className="text-[16px] md:text-[18px]">✅ Nhận thu nhập minh bạch từ khóa học.</p>
                    </div>

                    <div>
                        <ButtonView nameLink="/register" title="Đăng ký ngay" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BoxOverviewInstructor;
