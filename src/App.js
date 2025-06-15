import { TodoListPage } from "./page/todo-list-page.component";
import { ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider theme={{ hash: false }}>
      <TodoListPage />
    </ConfigProvider>
  );
}

export default App;
