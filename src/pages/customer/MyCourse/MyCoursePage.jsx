import BoxShowCourseCard from "./CourseCard/BoxShowCourseCard";
import useFetchData from "../../../api/useFetchData";
import { useMemo } from "react";
import useAuth from "../../../hooks/useAuth";

const MyCoursePage = () => {
    const { data: checkout = [], loading } = useFetchData("checkout");
    const showListCourses  = useMemo(
        () => checkout?.filter((item) => item.status !== "pending" && item.status !== "cancelled"),
        [checkout]
    );
     const { user } = useAuth();

    const myCoursesList = useMemo(() => {
        return showListCourses.filter(order => order.user_id === user?._id);
    }, [showListCourses, user]);

    return (
        <div className="mt-[50px]">
            <div className="h-[110px] bg-[rgb(0,0,0)] ">
                <div className="max-w-[1080px] mx-auto h-full flex items-center px-[15px] lg:px-0">
                    <div className="flex flex-col items-start gap-2">
                        <h1 className=" text-[14px] md:text-[16px] lg:text-[28px] font-semibold text-[#ffffff]">Khóa học của tôi</h1>
                        <div className="w-[100px] "><hr  className="border-[1px] border-[#ffffff] w-full"/></div>
                    </div>
                </div>
            </div>
            <div className="max-w-[1080px] mx-auto mt-5 px-[15px] lg:px-0">
                <BoxShowCourseCard
                    showList={myCoursesList}
                    loading={loading}
                />
            </div>
        </div>
    );
}

export default MyCoursePage;