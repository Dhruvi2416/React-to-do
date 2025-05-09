import TodoWrapper from "./components/TodoWrapper";
import TodoProvider from "./providers/TodoProvider";
// import Callback from "./components/Callback";
import "./App.css";
function App() {
  return (
    <div className="container flex  align-items-center justify-center flex-col   ">
      <TodoProvider>
        <TodoWrapper />
      </TodoProvider>
      {/* <Callback /> */}
    </div>
  );
}
export default App;
