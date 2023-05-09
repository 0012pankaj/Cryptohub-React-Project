
import { BrowserRouter, Route } from 'react-router-dom';


import './App.css';
import Header from './components/Header';
import Coinpage from './pages/Coinpage';
import Homepage from './pages/Homepage';
import { makeStyles } from '@material-ui/core';

 //styling using material ui makeStyle()
const usestyles = makeStyles(()=>({
  App:{
    backgroundColor:'#14161a',
    color:"white",
    
    minHeight:"100vh",

  }, 
}));

function App() {
  
  const classess=usestyles()

  return (
     <BrowserRouter>
     <div className={classess.App}>
     <Header/> 
      <Route path="/"  component={Homepage} exact/>
      <Route path="/coins/:id"  component={Coinpage}exact/>
     
     </div>
     </BrowserRouter>
  );
}

export default App;
