import { Route, Routes } from "react-router-dom";
import TodoWrapper from "./components/TodoWrapper";
import { Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
// import Callback from "./components/Callback";
import "./App.css";
import TodoProvider from "./providers/TodoProvider";
import { useUserContext } from "./providers/UserProvider";
import { ToastContainer } from "react-toastify";
import { handleError } from "./helpers/util";

function App() {
  const { user } = useUserContext();
  return (
    <div className=" flex  align-items-center justify-center flex-col   ">
      <Routes>
        <Route
          path="/"
          element={!user ? <Login /> : <Navigate to="/todos" replace />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/todos" replace />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/todos" replace />}
        />
        <Route
          path="/tod os"
          element={
            user ? (
              <TodoProvider>
                <TodoWrapper />
              </TodoProvider>
            ) : (
              (() => {
                handleError("Please login first");
                return <Navigate to="/login" replace />;
              })()
            )
          }
        />
      </Routes>

      <ToastContainer />
      {/* <Callback /> */}
    </div>
  );
}
export default App;
