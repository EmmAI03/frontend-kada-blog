import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  message,
} from "antd";

const { Title, Text } = Typography;

export default function SignUp() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    const { username, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      message.warning("Passwords do not match");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:5173/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        message.error(errData.message || "Sign up failed");
        return;
      }

      const data = await res.json();
      message.success(data.message || "Sign up successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      message.error("An error occurred during sign up.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-sm shadow-lg rounded-2xl">
        <Title level={3} className="text-center mb-6">
          Sign Up
        </Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: "Please confirm your password" }]}
          >
            <Input.Password placeholder="Confirm password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={submitting}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <Text className="block text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </Text>
      </Card>
    </div>
  );
}
