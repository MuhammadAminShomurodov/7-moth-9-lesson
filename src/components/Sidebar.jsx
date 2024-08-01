import React from "react";
import { Menu } from "antd";

const Sidebar = () => {
  return (
    <div style={{ width: 200 }}>
      <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
        <Menu.Item key="2">Todos</Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
