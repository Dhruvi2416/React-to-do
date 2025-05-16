import { Route, Routes } from "react-router-dom";
import TodoWrapper from "./components/TodoWrapper";

import Login from "./components/Login";
import Register from "./components/Register";
// import Callback from "./components/Callback";
import "./App.css";
import TodoProvider from "./providers/TodoProvider";

function App() {
  return (
    <div className=" flex  align-items-center justify-center flex-col   ">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/todos"
          element={
            <TodoProvider>
              <TodoWrapper />
            </TodoProvider>
          }
        />
      </Routes>

      {/* <Callback /> */}
    </div>
  );
}
export default App;
