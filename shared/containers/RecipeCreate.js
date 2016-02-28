import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createRecipe } from '../redux/modules/recipes'

const propTypes = {
  createRecipe: PropTypes.func.isRequired,
}

const contextTypes = {
  router: React.PropTypes.object,
}

class RecipeCreate extends Component {
  state = {
    name: '',
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (this.state.name) {
      this.props.createRecipe(this.state)
      this.context.router.push('/recipes')
    }
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset className="form-group">
          <label>Recipe Name</label>
          <input type="text" className="form-control"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
          <small className="text-muted">You can use any name you like here.</small>
        </fieldset>
        <button type="submit" className="btn btn-primary">Create Recipe</button>
      </form>
    )
  }
}

RecipeCreate.propTypes = propTypes
RecipeCreate.contextTypes = contextTypes

const mapDispatchToProps = (dispatch) => {
  return {
    createRecipe: (recipe) => {
      dispatch(createRecipe(recipe))
    },
  }
}

export default connect(null, mapDispatchToProps)(RecipeCreate)
