import React from "react";
import { Layout } from "antd";
import TodoList from "./features/todos/TodoList";
import AddTodo from "./features/todos/AddTodo";
import Sidebar from "./components/Sidebar";

const { Header, Content, Sider } = Layout;

function App() {
  return (
    <Layout style={{ height: "100vh" }}>
      <Header className="header">
        <div className="logo" />
        <h1 style={{ color: "white" }}>Todo App</h1>
      </Header>
      <Layout>
        <Sider width={200}>
          <Sidebar />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <AddTodo />
            </div>
            <TodoList />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
