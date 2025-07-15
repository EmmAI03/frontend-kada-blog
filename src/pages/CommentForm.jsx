import { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { addComment } from "../api/posts";

const { TextArea } = Input;

function CommentForm({ postId, onComment }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFinish = async (values) => {
    setLoading(true);
    setError(null);
    try {
      const newComment = await addComment(postId, values.content);
      onComment(newComment);
      form.resetFields(); // Clear input after success
    } catch (err) {
      setError("Failed to post comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#fff", padding: "24px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item
          label="Your Comment"
          name="content"
          rules={[{ required: true, message: "Please enter your comment!" }]}
        >
          <TextArea
            rows={4}
            placeholder="Write something..."
            disabled={loading}
          />
        </Form.Item>

        {error && (
          <Alert
            type="error"
            message={error}
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
          >
            Post Comment
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CommentForm;
