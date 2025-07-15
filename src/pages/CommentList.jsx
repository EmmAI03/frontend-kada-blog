import React from "react";
import { List, Avatar, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";

const CommentList = ({ comments }) => {
  return (
    <div style={{ marginTop: "24px" }}>
      <List
        itemLayout="horizontal"
        dataSource={comments}
        locale={{ emptyText: "No comments yet." }}
        renderItem={(comment) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  icon={<UserOutlined />}
                  src={comment.avatar || null}
                />
              }
              title={
                <span style={{ fontWeight: "600" }}>{comment.author}</span>
              }
              description={
                <div>
                  <div>{comment.text}</div>
                  <Tooltip
                    title={new Date(comment.createdAt).toLocaleString()}
                  >
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#999",
                        marginTop: "4px",
                      }}
                    >
                      {new Date(comment.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </Tooltip>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default CommentList;
