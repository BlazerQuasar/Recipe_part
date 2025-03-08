import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';

// 导入页面组件
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import AddRecipe from './pages/AddRecipe';
import EditRecipe from './pages/EditRecipe';

// 导入布局组件
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';

// 导入样式
import './App.css';

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout className="layout">
        <AppHeader />
        <Content className="site-content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
              <Route path="/add-recipe" element={<AddRecipe />} />
              <Route path="/edit-recipe/:id" element={<EditRecipe />} />
            </Routes>
          </div>
        </Content>
        <AppFooter />
      </Layout>
    </Router>
  );
}

export default App; 