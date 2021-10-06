import React from 'react';
import ReactDOM from 'react-dom';
import ActivityDetail from './components/ActivityDetail.jsx';
import Header from './Header.jsx';

const App = () => {
  return (
    <div>
      <ActivityDetail />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
