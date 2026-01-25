import { Form, Input, Button, Alert } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import useFetchData from "../../api/useFetchData";
// import axios from "axios";

export default function Login() {
  const { data: users = [] } = useFetchData("users");
  const [message, setMessage] = useState({
      type: "", // success, error
      content: "",
  });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  
  const onFinish = (values) => {
    setLoading(true);
    setMessage({ type: "", content: "" });

    const checkUserLogin = users.find(
      (u) =>
        u.email === values.email &&
        String(u.password) === String(values.password)
    );

    if (!checkUserLogin) {
      setTimeout(() => {
        setMessage({
          type: "error",
          content: "Email hoặc mật khẩu không đúng!",
        });
        setLoading(false);
      }, 600);

      return;
    }
    localStorage.setItem("user", JSON.stringify(checkUserLogin)); 
    nav(checkUserLogin.role === "admin" ? "/admin" : "/");
};
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Đăng nhập
        </h1>

        <Form
          disabled={loading}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input placeholder="example@email.com" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
            ]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

            {
                message.content && (
                    <div className="mb-4">
                        <Alert
                            type={message.type}
                            showIcon
                            description={message.content}
                        />

                    </div>
                )
            }


          {/* Button */}
          <Form.Item>
            <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={loading}
                >
                Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Chưa có tài khoản? <span className="text-blue-500 cursor-pointer">Đăng ký</span>
        </p>
      </div>
    </div>
  );
}
