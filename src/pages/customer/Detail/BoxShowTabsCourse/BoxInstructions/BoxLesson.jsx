
import VideoIcon from "../../../../../components/icons/VideoIcon";

function BoxLesson({ title, time }) {
  return (
    <div className="flex justify-between items-center py-3">
      <div className="flex items-center gap-3">
        <VideoIcon size={20} className="text-[#FF782D]" />
        <span>{title}</span>
      </div>
      <span className="text-gray-500">{time}</span>
    </div>
  );
}

export default BoxLesson;