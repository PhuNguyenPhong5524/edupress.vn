




import { useState } from "react";
import SearchIcon from "../icons/SearchIcon";

const mockProducts = [
  {
    id: 1,
    title: "ReactJS từ cơ bản đến nâng cao",
    author: "Nguyễn Văn A",
    price: "499.000đ",
    image: "/",
  },
  {
    id: 2,
    title: "NodeJS & Express thực chiến",
    author: "Trần Thị B",
    price: "399.000đ",
    image: "/",
  },
  {
    id: 3,
    title: "UI/UX cho người mới bắt đầu",
    author: "Lê Văn C",
    price: "299.000đ",
    image: "/",
  },
];

export default function SearchDropdown() {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  const results = mockProducts.filter((item) =>
    item.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="relative">
      <li 
         onClick={() => setOpen(true)}
        className="text-[#000000] text-[18px] px-[5px] py-[15px] md:py-[20px] md:px-[15px] hover:text-[#FF782D] hover:bg-[#F5F5F5] cursor-pointer">
        <SearchIcon size={24}/>  
      </li>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-1000"
        />
      )}

      {/* Search box */}
      {open && (
        <div className="absolute right-0 mt-3 w-[420px] bg-white rounded-2xl shadow-xl z-50 p-4">
          {/* Input */}
          <div className="flex items-center gap-2 border rounded-xl px-3 py-2">
            <SearchIcon size={18} className="text-gray-400" />
            <input
              autoFocus
              type="text"
              placeholder="Tìm khóa học..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="flex-1 outline-none text-sm"
            />
            {/* <button onClick={() => setOpen(false)}>
              <X size={18} className="text-gray-400 hover:text-black" />
            </button> */}
          </div>

          {/* Result */}
          <div className="mt-4 max-h-[320px] overflow-y-auto">
            {results.length > 0 ? (
              results.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.author}
                    </p>
                    <p className="text-sm font-medium text-orange-500 mt-1">
                      {item.price}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-6">
                Không tìm thấy khóa học phù hợp 😢
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
