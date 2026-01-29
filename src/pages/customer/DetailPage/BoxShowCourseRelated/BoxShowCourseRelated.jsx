
import ButtonViewAll from "../../../../components/buttons/ButtonViewAll";
import SwiperShowCourseRelated from "./SwiperShowCourseRelated";

const BoxShowCourseRelated = ({courses, loading , providers, currentCourses}) => {
    const provider = providers?.find(item => item.id === currentCourses?.provider_id);
  return (
    <div>
        <div className="pb-[20px] flex justify-between items-center w-full">
            {/* <!-- Title --> */}
                <div className="flex flex-col leading-[20px] border-l-4 border-[#FF782D] pl-4">
                    <h2 className="text-[16px] lg:text-[22px] font-semibold text-[#000000]">
                        Các khóa học của
                        <span className="text-[#FF782D]"> {provider?.provider_name}</span>
                    </h2>
                </div>
            {/* <!-- Button --> */}
                <ButtonViewAll nameLink={"/course"} />
        </div>
        {/* Box show slider course featured */}
            <SwiperShowCourseRelated 
                courses={courses} 
                loading={loading} 
                btnsw={'related'} 
                providers={providers}
                currentCourses={currentCourses}
            />
           
    </div>
    )   
}
export default BoxShowCourseRelated;