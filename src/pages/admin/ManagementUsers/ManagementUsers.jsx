import React, { useMemo } from "react";
import { Table, Button, Space, Tag, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import useFetchData from "../../../api/useFetchData";
import BoxAddUser from "./BoxAddUser/BoxAddUser";

const ManagementUsers = () => {

  const { data: users, loading, refetch } = useFetchData("users");

  const showUsers = useMemo(() => {
    return [...users].sort((a, b) =>
      b._id.localeCompare(a._id) 
    );
  }, [users]);

  // 🗑 Xóa user
  const handleDelete = async (_id) => {
    try {
      await axios.delete(`https://mindx-mockup-server.vercel.app/api/resources/users/${_id}?apiKey=6957348a9dda81df11d0c527`);
      message.success("Xóa thành công");
      refetch(); // Reload data
    } catch (error) {
      message.error("Xóa thất bại");
    }
  };

  const handleEdit = (record) => {
    console.log("Edit user:", record);
    message.info("Chức năng sửa đang phát triển");
  };

  const columns = [
    {
      title: "Tên",
      dataIndex: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (role) => {
        if (role === "admin") return <Tag color="red">Admin</Tag>;
        if (role === "provider") return <Tag color="blue">Provider</Tag>;
        return <Tag color="green">Customer</Tag>;
      },
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <Space>
          <button
            className="
              bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer
                transform transition duration-300 ese-in-out hover:scale-95 hover:opacity-65
            "
            onClick={() => handleEdit(record)}
          >
            <EditOutlined />{" "}
            Sửa
          </button>

          <Popconfirm
            title="Bạn chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record._id)} // 👈 dùng id từ DB
          >
            <button 
              className="
                bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer
                transform transition duration-300 ese-in-out hover:scale-95 hover:opacity-65
              "
            >
              <DeleteOutlined />{" "}
              Xóa
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div >
      <div className="flex justify-between items-center"> 
          <h1 className="text-[18px] font-semibold">Quản lý tài khoản</h1>
          <BoxAddUser refetch={refetch}/>
      </div>
      <Table
        rowKey="_id" // 👈 QUAN TRỌNG nếu dùng Mongo thì đổi thành _id
        columns={columns}
        dataSource={showUsers}
        loading={loading}
        pagination={{ pageSize: 5 }}
        className="shadow-lg rounded-2xl border-[1px] border-dashed border-[#c8c8c8] overflow-hidden px-3 mt-3"
      />
    </div>
  );
};

export default ManagementUsers;
