import TitleHome from "../../../../components/title/TitleHome";
import ButtonViewAll from "../../../../components/buttons/ButtonViewAll";
import SwiperShowCourse from "../SwiperShowCourse";

const BoxShowFeaturedCourse = ({courses, loading}) => {
  return (
    <div>
        <div className="py-[30px] flex justify-between items-center">
            {/* <!-- Title --> */}
                <TitleHome  
                    title={"Khóa học nổi bật"} 
                    description={"Khám phá các khóa học được chọn lọc dành riêng cho bạn"} 
                />
            {/* <!-- Button --> */}
                <ButtonViewAll nameLink={"/course"} />
        </div>
        {/* Box show slider course featured */}
            <SwiperShowCourse courses={courses} loading={loading} />
           
    </div>
    )   
}
export default BoxShowFeaturedCourse;