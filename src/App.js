import React from 'react';
import Routes from './routes'
import './App.css';
import { ContextWrapper } from './user-context';

const App = () => {
  return (
    <ContextWrapper>
        <div className="content">
          <Routes />
        </div>
    </ContextWrapper>
  );
}

export default App;
