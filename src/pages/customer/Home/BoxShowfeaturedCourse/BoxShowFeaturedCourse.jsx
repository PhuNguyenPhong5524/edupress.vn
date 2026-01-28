import TitleHome from "../../../../components/title/TitleHome";
import ButtonViewAll from "../../../../components/buttons/ButtonViewAll";
import SwiperShowCourse from "../../../../components/SwiperShowCourse";

const BoxShowFeaturedCourse = ({courses, loading}) => {
    const showCourseFeature = courses?.filter(item => item.feature === true);
  return (
    <div>
        <div className="py-[30px] flex justify-between items-center">
            {/* <!-- Title --> */}
                <TitleHome  
                    title={"Khóa học nổi bật"} 
                    description={"Khám phá các khóa học nổi bật"} 
                />
            {/* <!-- Button --> */}
                <ButtonViewAll nameLink={"/course"} />
        </div>
        {/* Box show slider course featured */}
            <SwiperShowCourse courses={showCourseFeature} loading={loading} btnsw={'feature'} />
           
    </div>
    )   
}
export default BoxShowFeaturedCourse;