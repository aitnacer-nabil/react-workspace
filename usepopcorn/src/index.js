import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
import StarRating from './StarRating';

const root = ReactDOM.createRoot(document.getElementById('root'));
function Test(){
  const [rating, setRating] = useState(0)
  return <div>
     <StarRating maxRating={5} messages={["bad",'average','good','very good','Exlent'] } defaultRating = {0} color='#fcf' onSetRating={setRating}/>
     <p>rate this move {rating}</p>
  </div>
}
root.render(
 
  <React.StrictMode>
    <StarRating maxRating={5} messages={["bad",'average','good','very good','Exlent'] } defaultRating = {3}/>
    <Test />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
