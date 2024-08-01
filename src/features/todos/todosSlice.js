import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = "http://localhost:3000/todos";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(apiUrl);
  return response.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (text) => {
  const response = await axios.post(apiUrl, { text, complete: false });
  return response.data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axios.delete(`${apiUrl}/${id}`);
  return id;
});

export const toggleComplete = createAsyncThunk(
  "todos/toggleComplete",
  async (id) => {
    const response = await axios.get(`${apiUrl}/${id}`);
    const updatedTodo = { ...response.data, complete: !response.data.complete };
    await axios.put(`${apiUrl}/${id}`, updatedTodo);
    return updatedTodo;
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
        toast.success("Todo added successfully!");
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        toast.success("Todo deleted successfully!");
      })
      .addCase(toggleComplete.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
          toast.success("Todo status updated successfully!");
        }
      });
  },
});

export default todosSlice.reducer;
