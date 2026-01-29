import axios from "axios";
import { Form, Input, Button, Alert } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetchData from "../../api/useFetchData";

const API_URL =
  "https://mindx-mockup-server.vercel.app/api/resources/users?apiKey=6957348a9dda81df11d0c527";

const Register = () => {
  const { data: users = [] } = useFetchData("users");
  const [message, setMessage] = useState({ type: "", content: "" });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setMessage({ type: "", content: "" });

    // 1️⃣ Check email tồn tại (frontend)
    const isExist = users.some((u) => u.email === values.email);

    if (isExist) {
      setMessage({
        type: "error",
        content: "Email đã tồn tại!",
      });
      setLoading(false);
      return;
    }

    // 2️⃣ Data gửi lên API
    const newUser = {
      id: users.length + 1,
      email: values.email,
      username: values.username,
      password: values.password,
      role: "customer",
    };

    try {
      await axios.post(API_URL, newUser);

      setMessage({
        type: "success",
        content: "Đăng ký thành công! Chuyển sang đăng nhập...",
      });

      setTimeout(() => {
        nav("/login");
      }, 800);
    } catch (error) {
      setMessage({
        type: "error",
        content: "Đăng ký thất bại. Vui lòng thử lại!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bgr_login min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="flex flex-col sm:flex-row items-center gap-6 lg:gap-12 w-full max-w-5xl">

        {/* Image */}
        <div className="hidden sm:block">
          <img
            src="/images/img_register.png"
            alt="register"
            className="w-[260px] md:w-[320px] lg:w-[360px] animate-[bounce_5s_infinite]"
          />
        </div>

        {/* Form */}
        <div className="w-full max-w-[360px] lg:max-w-[400px] bg-white px-6 py-[20px] lg:p-8 rounded-xl shadow-lg">
          <h3 className="text-[28px] font-semibold text-gray-900 mb-2 text-center">
            Đăng ký
          </h3>

          <Form
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            disabled={loading}
          >
            <Form.Item
              className="custom-form-item"
              label={<span className="text-[12px]">Email</span>}
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input className="custom-input" placeholder="example@email.com"/>
            </Form.Item>

            <Form.Item
              className="custom-form-item"
              label={<span className="text-[12px]">Tên người dùng</span>}
              name="username"
              rules={[
                { required: true, message: "Vui lòng nhập tên người dùng!" },
              ]}
            >
              <Input className="custom-input" placeholder="Nguyen Van A" />
            </Form.Item>

            <Form.Item
              className="custom-form-item"
              label={<span className="text-[12px]">Mật khẩu</span>}
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                { min: 6, message: "Mật khẩu tối thiểu 6 ký tự!" },
              ]}
            >
              <Input.Password className="custom-input" placeholder="Nhập mật khẩu" />
            </Form.Item>

            <Form.Item
              className="custom-form-item"
              label={<span className="text-[12px]">Xác nhận mật khẩu</span>}
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu xác nhận không khớp!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password className="custom-input" placeholder="Nhập lại mật khẩu"/>
            </Form.Item>

            {message.content && (
              <Alert
                type={message.type}
                showIcon
                className="mb-3"
                description={<span className="text-[12px]">{message.content}</span>}
              />
            )}

            <Form.Item className="custom-form-item">
              <Button
                htmlType="submit"
                loading={loading}
                className="custom-btn w-full"
              >
                Đăng ký
              </Button>
            </Form.Item>

            <p className="text-center text-[10px] sm:text-[12px] text-gray-600">
              Đã có tài khoản?
              <Link to="/login" className="text-blue-600 hover:underline ml-1">
                Đăng nhập
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;