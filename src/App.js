import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/header';
import Dashboard from './components/dashboard';
import Stats from './components/Stats';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;
