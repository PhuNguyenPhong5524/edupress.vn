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
                <h1 className="text-lg font-semibold">
                    NodeJS Pro - Tự Học từ số 0 (MVC, REST APIs, SQL/MongoDB)
                </h1>
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

                {/* Tabs */}
                <div className="border-b px-4 lg:px-10 py-4 flex gap-6 text-gray-600 text-sm font-medium">
                    <span className="border-b-2 border-black pb-2 text-black">
                    Tổng quan
                    </span>
                    <span>Ghi chú</span>
                    <span>Thông báo</span>
                    <span>Đánh giá</span>
                    <span>Công cụ học tập</span>
                </div>

                {/* Content */}
                <div className="px-4 lg:px-10 py-8">
                    <h2 className="text-2xl font-semibold mb-4">
                    Hướng dẫn chính thức về cách lập kế hoạch, sản xuất và xuất bản
                    khóa học online chất lượng cao
                    </h2>

                    <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                    <div>
                        <span className="font-semibold text-orange-500">4.8 ★</span>
                        <p>74 xếp hạng</p>
                    </div>
                    <div>
                        <span className="font-semibold">2.396</span>
                        <p>Học viên</p>
                    </div>
                    <div>
                        <span className="font-semibold">1,5 giờ</span>
                        <p>Tổng thời lượng</p>
                    </div>
                    </div>
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
