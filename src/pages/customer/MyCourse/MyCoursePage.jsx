import CourseCard from "./CourseCard/CourseCard";


const MyCoursePage = () => {
    return (
        <div className="mt-[50px]">
            <div className="h-[110px] bg-[rgb(0,0,0)] ">
                <div  className="max-w-[1080px] mx-auto h-full flex items-center">
                    <div className="flex flex-col items-start gap-2">
                        <h1 className=" text-[14px] md:text-[16px] lg:text-[28px] font-semibold text-[#ffffff]">Khóa học của tôi</h1>
                        <div className="w-[100px] "><hr  className="border-[1px] border-[#ffffff] w-full"/></div>
                    </div>
                </div>
            </div>
            <div className="max-w-[1080px] mx-auto mt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <CourseCard
                    />
                
                </div>
            </div>
        </div>
    );
}

export default MyCoursePage;