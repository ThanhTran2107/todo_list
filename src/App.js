import { ConfigProvider } from 'antd';

import { TodoListPage } from './page/todo-list-page.component';

function App() {
  return (
    <ConfigProvider theme={{ hash: false }}>
      <TodoListPage />
    </ConfigProvider>
  );
}

export default App;
