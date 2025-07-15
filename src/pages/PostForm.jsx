import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { createPost, getPost, updatePost } from "../api/posts";
import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  message,
} from "antd";

const { Title } = Typography;
const { TextArea } = Input;

function PostForm({ edit }) {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (edit && id) {
      getPost(id).then((res) => {
        form.setFieldsValue({
          title: res.title,
          content: res.content,
        });
      });
    }
  }, [edit, id, form]);

  const handleSubmit = async (values) => {
    try {
      if (edit) {
        await updatePost({ id, ...values });
        message.success("Post updated");
        navigate(`/posts/${id}`);
      } else {
        const newPost = await createPost(values);
        message.success("Post created");
        navigate(`/posts/${newPost._id}`);
      }
    } catch (err) {
      message.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 px-4">
      <Card className="shadow-md rounded-xl">
        <Link to="/" className="text-blue-500 hover:underline text-sm block mb-4">
          ← Back
        </Link>

        <Title level={3} style={{ marginBottom: 24 }}>
          {edit ? "Edit Post" : "Create New Post"}
        </Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <Input placeholder="Post title" />
          </Form.Item>

          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: "Please enter the content" }]}
          >
            <TextArea rows={8} placeholder="Write your content here..." />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {edit ? "Update Post" : "Create Post"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default PostForm;
