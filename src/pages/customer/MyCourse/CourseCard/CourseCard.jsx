import { Link } from "react-router-dom";
import PlayIcon from "../../../../components/icons/PlayIcon";




const CourseCard = ({

}) => {
  return (
    <div
      className="group cursor-pointer w-full "
    >
      {/* Thumbnail */}
        <Link 
            to={`/learning/${1}`}
            className="relative overflow-hidden rounded-[10px]"
        >
            <img
                src={``}
                alt={``}
                className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="
                absolute inset-0 bg-[#7d7d7d47] opacity-0 group-hover:opacity-100
                transition-all duration-300 flex items-center justify-center
            ">
                <div className="
                    w-14 h-14 bg-[#FF782D] rounded-full
                    flex items-center justify-center scale-75
                    group-hover:scale-100 transition-transform duration-300
                ">
                    <PlayIcon className="w-6 h-6 text-[#ffffff] ml-[2px]" />
                </div>
            </div>
        </Link>

      {/* Content */}
      <div className="mt-3">
        <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
            Cách tạo một khóa học Udemy (Có phụ đề)
        </h3>
        <p className="text-sm text-gray-600 my-2">
          Lâm Lâm Lâm
        </p>
        <hr className="border-gray-300 my-1" />
        <span className="text-[#adadad]">Bắt đầu khóa học</span>
      </div>
    </div>
  );
};

export default CourseCard;
