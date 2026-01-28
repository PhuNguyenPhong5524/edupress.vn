import BookIcon from "../../../../components/icons/BookIcon";
import ClockIcon from "../../../../components/icons/ClockIcon"
import GraduationIcon from "../../../../components/icons/GraduationIcon"
import SignalIcon from "../../../../components/icons/SignalIcon";
import BoxCourseInfoCard from "./BoxCourseInfoCard";
const BoxShowInfo = ({showStickyCard, showList}) => {
    return (
        <div className="w-full bg-[#000000] text-white py-10">
            <div
                className="
                max-w-[1080px] mx-auto w-full
                grid gap-8
                grid-cols-1
                lg:grid-cols-[2fr_1fr]
                relative
                px-4 lg:px-0
                "
            >
                {/* Box Left */}
                <div className="showInfoCourse w-full">
                    <h1
                        className="
                        text-[22px] leading-tight
                        md:text-[30px]
                        lg:text-[38px]
                        font-semibold
                        "
                    >
                        {showList?.course_title}
                    </h1>

                    <div
                        className="
                        flex flex-wrap items-center gap-x-6 gap-y-3
                        mt-5 text-[14px]
                        md:text-[15px]
                        "
                    >
                        <div className="flex items-center">
                            <ClockIcon size={18} className="text-[#FF782D]" />
                            <span className="ml-2">{showList?.duration}</span>
                        </div>

                        <div className="flex items-center">
                            <GraduationIcon size={18} className="text-[#FF782D]" />
                            <span className="ml-2">{showList?.students}</span>
                        </div>

                        <div className="flex items-center">
                            <BookIcon size={18} className="text-[#FF782D]" />
                            <span className="ml-2">{showList?.total_sections}</span>
                        </div>

                        <div className="flex items-center">
                            <SignalIcon size={18} className="text-[#FF782D]" />
                            <span className="ml-2">Tất cả mức độ</span>
                        </div>
                    </div>
                </div>

                {/* Box Right */}
                <div className="w-full relative hidden lg:block">
                    {!showStickyCard && (
                        <div
                            className="
                                lg:absolute lg:top-0
                                w-full
                                transition-all duration-300
                            "
                        >
                            <BoxCourseInfoCard showList={showList} />
                        </div>
                    )}
                </div>
                <div className="w-full relative block lg:hidden">
                    <BoxCourseInfoCard showList={showList} />
                </div>
            </div>
        </div>

    );
}
export default BoxShowInfo;