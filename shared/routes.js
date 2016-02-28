import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Recipes from './containers/Recipes'
import RecipeCreate from './containers/RecipeCreate'

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={Recipes} />
    <Route path="/recipes" component={Recipes} />
    <Route path="/recipes/create" component={RecipeCreate} />
  </Route>
)

export default routes
