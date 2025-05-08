import React from 'react';
import { ConfigProvider, Layout, theme } from 'antd';
import { Provider as ReduxProvider } from 'react-redux';
import { useSelector } from 'react-redux';
import { store } from './redux/store';
import QueryProvider from './lib/QueryProvider';
import TodoApp from './page/Todo/TodoApp';
import { selectIsDarkMode } from './redux/uiSlice';

const { Content } = Layout;

// Wrapper component that can access Redux state
const AppContent = () => {
  const isDarkMode = useSelector(selectIsDarkMode);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Content style={{ padding: '0 50px', marginTop: 40 }}>
          <div style={{ background: 'var(--background)', padding: 24, borderRadius: 4 }}>
            <TodoApp />
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

// Main App component with providers
function App() {
  return (
    <ReduxProvider store={store}>
      <QueryProvider>
        <AppContent />
      </QueryProvider>
    </ReduxProvider>
  );
}

export default App;