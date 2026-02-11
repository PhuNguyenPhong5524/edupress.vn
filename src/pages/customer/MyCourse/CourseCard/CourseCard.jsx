import { Link } from "react-router-dom";
import PlayIcon from "../../../../components/icons/PlayIcon"


const CourseCard = ({ item, loading }) => {


  if (loading) {
    return (
      <div className="w-full h-[300px] rounded-[12px] bg-[#d8d8d8] animate-pulse flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="group cursor-pointer">
        <Link
          to={`/learning/${item.course_id}`}
          className="relative overflow-hidden rounded-[10px] block"
        >
          <img
            src={item.image_url}
            alt={item.course_title}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-[#7d7d7d47] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            <div className="w-14 h-14 bg-[#FF782D] rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
              <PlayIcon className="w-6 h-6 text-white ml-[2px]" />
            </div>
          </div>
        </Link>

        <div className="mt-3">
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
            {item.title}
          </h3>
          <p className="text-sm text-gray-600 my-2">{item.total_lectures} bài giảng</p>
          <hr className="border-gray-300 my-1" />
          <span className="text-[#adadad]">Bắt đầu khóa học</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;