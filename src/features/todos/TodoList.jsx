import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, Button, Typography, Pagination, Input, Modal } from "antd";
import { fetchTodos, deleteTodo, toggleComplete } from "./todosSlice";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(7);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // Get current todos based on search term
  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this todo?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(deleteTodo(id));
      },
    });
  };

  return (
    <div>
      <h2>Todo List</h2>
      <Input
        placeholder="Search todos"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: "20px" }}
      />
      <List
        bordered
        dataSource={currentTodos}
        renderItem={(todo) => (
          <List.Item
            actions={[
              <Button
                type={todo.complete ? "default" : "primary"}
                onClick={() => dispatch(toggleComplete(todo.id))}
              >
                {todo.complete ? "❌" : "✅"}
              </Button>,
              <Button type="danger" onClick={() => showDeleteConfirm(todo.id)}>
                Delete
              </Button>,
            ]}
          >
            <Typography.Text delete={todo.complete}>
              {todo.text}
            </Typography.Text>
          </List.Item>
        )}
      />
      <Pagination
        current={currentPage}
        pageSize={todosPerPage}
        total={filteredTodos.length}
        onChange={handlePageChange}
        style={{ marginTop: "20px", textAlign: "center" }}
      />
    </div>
  );
};

export default TodoList;
