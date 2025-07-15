import { Button, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <Popconfirm
      title="Are you sure you want to logout?"
      onConfirm={handleLogout}
      okText="Yes"
      cancelText="No"
    >
      <Button type="primary" danger>
        Logout
      </Button>
    </Popconfirm>
  );
};

export default LogoutButton;
