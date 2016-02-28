import React, { PropTypes } from 'react'

function RecipeListItem(props) {
  return (
    <li>Recipe: {props.recipe.name}</li>
  )
}

RecipeListItem.propTypes = {
  recipe: PropTypes.object.isRequired,

  // onClick: PropTypes.func.isRequired,
  // onDelete: PropTypes.func.isRequired,
}

export default RecipeListItem
