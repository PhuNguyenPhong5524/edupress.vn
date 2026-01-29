'use client';

import { useMemo, useState } from "react";
import { Dropdown } from "antd";
import SearchIcon from "../icons/SearchIcon";
import ShowCourseSearch from "./ShowCourseSearch";


export default function SearchDropdown({ loading, courses}) {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  const results = useMemo(() => {
    // Chưa nhập gì → hiện khóa học nổi bật
    if (!keyword.trim()) {
      return courses?.filter(item => item.feature === true);
    }

    const key = keyword.toLowerCase();
    return courses?.filter(item =>
      item.course_title.toLowerCase().includes(key)
    );
  }, [courses, keyword]);

  const handleClose = () =>{
    setOpen(false);
    setKeyword('');
  }
  return (
    <Dropdown
      open={open}
      onOpenChange={setOpen}
      trigger={['click']}
      placement="topRight"
      popupRender={() => (
        <ShowCourseSearch
          keyword={keyword}
          setKeyword={setKeyword}
          results={results}
          loading={loading}
          onclose={handleClose}
        />
      )}
    >
      <li className="px-3 py-4 cursor-pointer hover:text-[#FF782D]">
        <SearchIcon size={24} />
      </li>
    </Dropdown>
  );
}

