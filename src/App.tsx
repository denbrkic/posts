import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import Home from './views/Home/Home';
import Posts from './views/Posts/Posts';

function App() {
  return (
    <div className="App">
      <Switch>
				<Route path="/" exact component={Home} />
				<Route path="/posts" exact component={Posts} />
			</Switch>
    </div>
  );
}

export default App;
