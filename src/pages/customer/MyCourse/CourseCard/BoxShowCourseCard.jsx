import CourseCard from "./CourseCard";

const BoxShowCourseCard = ({ showList, loading }) => {
  const courses = showList?.flatMap(
    (checkoutItem) => checkoutItem.courses || []
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses?.map((course, index) => (
        <CourseCard
            key={course._id ?? `${course.course_id}-${index}`}
            item={course}
            loading={loading}
        />
        ))}
    </div>
  );
};

export default BoxShowCourseCard;
