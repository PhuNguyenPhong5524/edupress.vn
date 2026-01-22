import { Collapse } from "antd";
import { CaretDownOutlined, ClockCircleOutlined } from "@ant-design/icons";
import BoxLesson from "./BoxLesson";


export default function BoxInstructions({showList}) {
  const course = showList;   

  const items = course.sections.map((section) => ({
    key: section.id.toString(),
    label: (
      <div className="flex justify-between items-center w-full">
        <span className="font-semibold text-white">
          {section.chapter_title}
        </span>

        <div className="flex items-center gap-4 text-white text-sm">
          <span>{section.lecture_count} bài giảng</span>
          <span>{section.duration}</span>
          <ClockCircleOutlined />
        </div>
      </div>
    ),
    children: (
      <div className="flex flex-col gap-2">
        {section.lectures.map((lecture) => (
          <BoxLesson
            key={lecture.id}
            title={lecture.title}
            time={lecture.duration}
            preview={lecture.preview}
          />
        ))}
      </div>
    ),
    className: "bg-[#1f2937]",
  }));

  return (
    <Collapse
      accordion
      items={items}
      expandIconPlacement="start"
      defaultActiveKey={[items[0]?.key]}
      expandIcon={({ isActive }) => (
        <CaretDownOutlined rotate={isActive ? 180 : 0} />
      )}
    />
  );
}

