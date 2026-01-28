


import TitleHome from "../../../../components/title/TitleHome";
import ButtonViewAll from "../../../../components/buttons/ButtonViewAll";
import SwiperShowCourse from "../../../../components/SwiperShowCourse";

const BoxShowNewCourse = ({courses, loading, btnsw}) => {
    
    const isNewCourse = (createdAt) => {
        if (!createdAt) return false;

        const diffDays =
            (Date.now() - new Date(createdAt)) / (1000 * 60 * 60 * 24);

        return diffDays <= 30;
        };

        const newCourses = courses?.filter(item =>
        isNewCourse(item.created_at)
    );


  return (
    <div>
        <div className="py-[30px] flex justify-between items-center">
            {/* <!-- Title --> */}
                <TitleHome  
                    title={"Khóa học mới"} 
                    description={"Khám phá các khóa học mới nhất"} 
                />
            {/* <!-- Button --> */}
                <ButtonViewAll nameLink={"/course"} />
        </div>
        {/* Box show slider course featured */}
            <SwiperShowCourse courses={newCourses} loading={loading} btnsw={btnsw} />
           
    </div>
    )   
}
export default BoxShowNewCourse;