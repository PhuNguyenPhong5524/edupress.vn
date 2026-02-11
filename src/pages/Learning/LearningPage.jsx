import { Link, useParams } from "react-router-dom";
import ArrowLeftIcon from "../../components/icons/ArrowLeftIcon";
import useFetchData from "../../api/useFetchData";
import { useEffect, useMemo, useState } from "react";
import BoxInstructions from "../customer/Detail/BoxShowTabsCourse/BoxInstructions/BoxInstructions";

const LearningPage = () => {

    const { _id } = useParams();
    const { data: course = [], loading } = useFetchData("courses");
    const showList = useMemo(() => {
        if (loading) return null;
        return course.find(item => item._id == _id);
    }, [course, _id, loading]);


    // 🎥 state lưu video đang phát
    const [currentVideo, setCurrentVideo] = useState("");

    useEffect(() => {
        if (!currentVideo && showList?.video_url) {
            setCurrentVideo(showList.video_url);
        }
    }, [showList, currentVideo]);



    return (
        <div className="min-h-screen bg-white">
        
            {/* ===== Header ===== */}
            <div className="bg-black text-white px-4 lg:px-5 py-4 flex items-center justify-between">
                <div className="flex flex-col lg:flex-row items-center gap-2 w-full">
                    {/* <!-- Logo --> */}
                        <Link 
                            to="/" 
                            className="
                                md:leading-[20px] w-full flex md:w-auto md:flex-col justify-center items-center 
                                lg:border-r-2 border-[#ffffff] pr-2
                            "
                        >
                            <div className="flex items-center gap-1 ">
                                <img src="/images/logo.png" alt="EduPress Logo" className="w-[30px] h-[20px] md:w-[40px] md:h-[30px]" />
                                <p 
                                    className=" 
                                        font-bold md:text-[24px] lg:text-[28px]
                                    "
                                >   
                                    EduPress
                                </p>
                            </div>
                        </Link>
                    <h1 className="text-[12px] md:text-[14px] lg:text-[16px] font-semibold">
                        {showList?.course_title}
                    </h1>
                </div>
                <Link 
                    to="/my-course"
                    className="
                        hidden lg:block bg-[#FF782D] px-4 py-2 rounded-md text-[10px] md:text-[12px] lg:text-[14px]
                        font-medium text-white transition-all duration-300 ease-in-out hover:opacity-90 hover:shadow-md 
                        hover:scale-105 active:scale-95 outline-none
                    "
                >
                <div className="flex items-center gap-2">
                    <ArrowLeftIcon size={18} /> 
                    <span>Thoát</span>
                </div>
                </Link>
            </div>

            {/* ===== Main Layout ===== */}
            <div className="flex flex-col lg:flex-row">
                
                {/* ===== Left Content ===== */}
                <div className="flex-1 lg:pr-[400px]">
                
                    {/* Video */}
                    <div className="bg-black w-full aspect-video flex items-center justify-center">
                        {currentVideo && (
                            <iframe
                                className="w-full h-[500px] rounded-md"
                                src={`${currentVideo}&autoplay=1&mute=1`}
                                title="YouTube video"
                                allow="autoplay; encrypted-media"
                            />
                        )}
                    </div>
                </div>

                {/* ===== Right Sidebar ===== */}
                <div className="hidden lg:block fixed right-2 top-[75px] w-[380px] h-[calc(100vh-72px)] bg-white overflow-y-auto">
                    <h3 className="text-lg font-semibold mb-4">
                        Nội dung khóa học
                    </h3>
                    <BoxInstructions 
                        showList={showList}
                        onSelectLecture={(url) => setCurrentVideo(url)}
                    />
                
                </div>

            </div>
        </div>
    );
};

export default LearningPage;
