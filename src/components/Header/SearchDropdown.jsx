'use client';

import { useMemo, useState } from "react";
import { Dropdown } from "antd";
import SearchIcon from "../icons/SearchIcon";
import ShowCourseSearch from "./ShowCourseSearch";


export default function SearchDropdown({ 
  loading, 
  keyword,
  setKeyword,
  results,
  handleClose
}) {
  const [open, setOpen] = useState(false);

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

