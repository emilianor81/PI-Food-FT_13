import './App.css';
import React from 'react';
import Landing from './components/landing/Landing';
import { Route} from 'react-router-dom'
import Footer from './components/footer/Footer';
import NavBar from './components/navBar/NavBar'
import Recipes from './components/recipes/Recipes'
import About  from './components/about/About';
import Create from './components/create/Create'
// import Recipes from './components/recipes/Recipes'


function App() {
  const routes = ['/home', '/about', '/recipe/:recipeId', '/create'];
    return (
    <>
       <Route exact path="/" component={Landing}/>
       <Route exact path="/" component={Footer}/>
       <Route path={routes} component={NavBar}/>
       <Route path={routes[0]}  component={Recipes}/>
       <Route path={routes[1]} component={About}/>
       <Route path={routes[3]}  component={Create}/>
    </>
 
    
  );
}

export default App;
