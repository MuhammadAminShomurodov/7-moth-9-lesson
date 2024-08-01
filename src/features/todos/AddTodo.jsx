import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Input, Form } from "antd";
import { addTodo } from "./todosSlice";

const AddTodo = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (text) {
      dispatch(addTodo(text));
      setText("");
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Todo
      </Button>
      <Modal
        title="Add Todo"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Todo">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter a todo"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddTodo;
