import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import RecipeList from '../components/RecipeList'

const propTypes = {
  recipes: PropTypes.array.isRequired,
}

class Recipes extends Component {
  render() {
    return (
      <div>
        <Link to="/recipes/create" className="btn btn-primary">Create Recipe</Link>
        <RecipeList recipes={this.props.recipes} />
      </div>
    )
  }
}

Recipes.propTypes = propTypes

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.data,
  }
}

export default connect(mapStateToProps)(Recipes)
