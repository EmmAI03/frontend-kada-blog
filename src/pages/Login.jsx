import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  Checkbox,
  Divider,
  message,
} from "antd";

const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { email, password } = values;
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Allow cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        message.error(data.message || "Login failed");
        return;
      }

      message.success(data.message || "Login success!");

      // Simpan status login dan username
      localStorage.setItem("isLoggedIn", "true");
      if (data.username) {
        localStorage.setItem("username", data.username);
      }

      navigate("/posts"); // Redirect to post list
    } catch (err) {
      console.error(err);
      message.error("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen bg-white">
      <div className="flex w-full h-screen bg-white items-center justify-center">
        <Card
          style={{ width: 350 }}
          cardstyle={{ width: 350 }}
          className="shadow-xl rounded-lg"
        >
          <Title level={3} className="text-center">
            Welcome!!!
          </Title>

          <Form
            layout="vertical"
            form={form}
            onFinish={handleSubmit}
            initialValues={{ remember: true }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Email is not valid" },
              ]}
            >
              <Input placeholder="emmyrahma@example.com" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password placeholder="Your password" />
            </Form.Item>

            <div className="flex justify-between items-center mb-4">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Button type="link" size="small">
                Forgot password?
              </Button>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
              >
                Log in
              </Button>
            </Form.Item>

            <Divider plain>OR</Divider>

            <Form.Item>
              <Button
                block
                style={{ backgroundColor: "#DB4437", color: "white" }}
              >
                Sign in with Google
              </Button>
            </Form.Item>

            <Form.Item>
              <div className="text-center text-sm">
                Don’t have an account?{" "}
                <Button
                  type="link"
                  onClick={() => navigate("/signup")}
                  className="p-0"
                >
                  Sign up
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </div>

    </div>
  );
};

export default Login;
