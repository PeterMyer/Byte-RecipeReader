import React from "react";
import { Route, Switch, Link, BrowserRouter as Router } from "react-router-dom";
import NewRecipe from './RecipeIntake'

const Routes = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={NewRecipe}/>
        </Switch>
      </div>
    </Router>
  )
}

export default Routes;
