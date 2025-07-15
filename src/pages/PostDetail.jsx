import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getPost,
  getComments,
  deleteComment,
  deletePost,
} from "../api/posts";
import CommentForm from "./CommentForm";
import {
  Card,
  Typography,
  Button,
  Space,
  Divider,
  List,
  Popconfirm,
  message,
} from "antd";

const { Title, Paragraph, Text } = Typography;

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPost(id).then(setPost);
    getComments(id).then(setComments);
  }, [id]);

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(id, commentId);
      setComments(comments.filter((c) => c._id !== commentId));
      message.success("Comment deleted");
    } catch {
      message.error("Failed to delete comment");
    }
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(id);
      message.success("Post deleted");
      navigate("/");
    } catch {
      message.error("Failed to delete post");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 mt-6">
      <Link to="/" className="text-blue-500 hover:underline block mb-4">
        ← Back to posts
      </Link>

      {post && (
        <Card bordered={false} className="shadow-md rounded-xl">
          <div className="flex justify-between items-center">
            <Title level={3} style={{ margin: 0 }}>
              {post.title}
            </Title>
            <Space>
              <Link to={`/edit/${id}`}>
                <Button type="primary" ghost>
                  Edit
                </Button>
              </Link>
              <Popconfirm
                title="Are you sure to delete this post?"
                onConfirm={handleDeletePost}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>Delete</Button>
              </Popconfirm>
            </Space>
          </div>

          <Divider />

          <Paragraph>{post.content}</Paragraph>

          <Divider />

          <Title level={4}>Comments</Title>

          {comments.length === 0 ? (
            <Text type="secondary">No comments yet.</Text>
          ) : (
            <List
              itemLayout="horizontal"
              dataSource={comments}
              renderItem={(comment) => (
                <List.Item
                  actions={[
                    <Popconfirm
                      title="Delete this comment?"
                      onConfirm={() => handleDeleteComment(comment._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button size="small" danger type="text">
                        Delete
                      </Button>
                    </Popconfirm>,
                  ]}
                >
                  <List.Item.Meta
                    description={<Text>{comment.content}</Text>}
                  />
                </List.Item>
              )}
            />
          )}

          <Divider />

          <CommentForm
            postId={id}
            onComment={(c) => setComments((prev) => [...prev, c])}
          />
        </Card>
      )}
    </div>
  );
}

export default PostDetail;
