import React from 'react';
import { Content } from './components/Content';
import { Footer } from './components/UI/Footer';
import { Header } from './components/UI/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
