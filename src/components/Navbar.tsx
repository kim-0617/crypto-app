import {
  BulbOutlined,
  FundOutlined,
  HomeOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Menu, MenuProps, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import icon from "../images/cryptocurrency.png";

const menuItems: MenuProps["items"] = [
  {
    label: <Link to="/">Home</Link>,
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: <Link to="/cryptocurrencies">Cryptocurrencies</Link>,
    key: "cryptocurrencies",
    icon: <FundOutlined />,
  },
  {
    label: <Link to="/news">News</Link>,
    key: "news",
    icon: <BulbOutlined />,
  },
];

function Navbar() {
  const [current, setCurrent] = useState<string>("home");
  const [activeMenu, setActiveMenu] = useState<boolean>(true);
  const [screenSize, setScreenSize] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const onMenu: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">Cryptoverse</Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu((prev) => !prev)}
        >
          <MenuOutlined />
        </Button>

        {activeMenu && (
          <Menu
            theme="dark"
            onClick={onMenu}
            selectedKeys={[current]}
            items={menuItems}
            className="navbar-menu"
          />
        )}
      </div>
    </div>
  );
}

export default Navbar;
