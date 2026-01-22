import BookIcon from "../../../../components/icons/BookIcon";
import ClockIcon from "../../../../components/icons/ClockIcon"
import GraduationIcon from "../../../../components/icons/GraduationIcon"
import SignalIcon from "../../../../components/icons/SignalIcon";
import BoxCourseInfoCard from "./BoxCourseInfoCard";
const BoxShowInfo = ({showStickyCard, showList}) => {
    return (
        <div className="w-full bg-[#000000] text-white py-10">
            <div className="max-w-[1080px] mx-auto grid grid-cols-[2fr_1fr] gap-8 relative w-full">
                {/* <!-- Box Left --> */}
                <div className="showInfoCourse w-full">
                    <div className="w-full">
                        <h1 className="text-[38px] font-semibold">
                            {showList && showList.course_title}
                        </h1>
                        <div className="flex items-center gap-4 mt-5">
                            <div className="flex items-center">
                                <ClockIcon size={20} className="text-[#FF782D]"/>
                                <span className="ml-1"> {showList && showList.duration}</span>  
                            </div>
                            <div className="flex items-center">
                                <GraduationIcon size={20} className="text-[#FF782D]"/>
                                <span className="ml-1"> {showList && showList.students}</span>
                            </div>
                            <div className="flex items-center">
                                <BookIcon size={20} className="text-[#FF782D]"/>
                                <span className="ml-1"> {showList && showList.total_sections}</span>
                            </div>
                            <div className="flex items-center">
                                <SignalIcon size={20} className="text-[#FF782D]"/>
                                <span>Tất cả mức độ</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Box Right --> */}
                <div className="w-full">
                    <div className="relative">
                        {!showStickyCard && (
                            <div className="absolute top-0 w-full transform transition-all ease-in-out duration-300">
                                <BoxCourseInfoCard  showList={showList}/>
                            </div>
                        )}
                    </div>
                    
                        {/* <!-- Modal Video --> */}
                            {/* <div id="default-modal" tabindex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                <div className="relative p-2 w-full max-w-2xl max-h-full">
                                
                                    <div className="relative bg-[#ffffff] rounded-md border border-default rounded-base shadow-sm p-4 md:p-6">
                                        <div className="flex justify-between items-center flex-col">
                                            <p className="text-[20px] text-[#000000] font-bold mb-[10px]">Xem trước khóa học</p> 
                                            <div className="video-container">
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                </div>
            </div>
        </div>
    );
}
export default BoxShowInfo;