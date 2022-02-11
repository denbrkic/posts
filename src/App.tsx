import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import Home from './views/Home/Home';
import Posts from './views/Posts/Posts';

function App() {
  const greeting = 'Hello from';

  return (
    <div className="App">
      <Switch>
				<Route path="/" exact render={() => <Home greeting={greeting} />} />
				<Route path="/posts" exact render={() => <Posts greeting={greeting} />} />
			</Switch>
    </div>
  );
}

export default App;
