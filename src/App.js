import * as React from 'react';
import './App.css';
import CreateTweet from './component/CreateTweet'
import Header from './component/AppBar'
import ShowComments from './component/ShowTweets'

const App = () => {
  return (
    <div className="App">
      <Header />
      <ShowComments />
      <CreateTweet />
    </div>
  );
}


export default App;