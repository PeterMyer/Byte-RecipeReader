import React from "react";
import { Route, Switch, Link, BrowserRouter as Router } from "react-router-dom";
import NewRecipe from './NewRecipe'

const Routes = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/New" component={NewRecipe}/>
        </Switch>
      </div>
    </Router>
  )
}

export default Routes;
