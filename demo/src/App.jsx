import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import LinksBlock from './component/LinksBlock';
import PageRouter from './pages/PageRouter';

class App extends Component {
  render() {
    return (
      <Provider store={window.store}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Redux-first-router + query params demo</h1>
          </header>

          <PageRouter/>
          <LinksBlock />
        </div>
      </Provider>
    );
  }
}

export default App;
