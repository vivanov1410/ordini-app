import React, { PropTypes } from 'react'
import RecipeListItem from './RecipeListItem'

function RecipeList(props) {
  if (!props.recipes.length) {
    return <h2>Please create'o yo recipe'to...</h2>
  }

  return (
    <div>
      <ul>
        {props.recipes.map((recipe, i) => (
          <RecipeListItem recipe={recipe} key={i} />
        ))}
      </ul>
    </div>
  )
}

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
}

export default RecipeList


//       {
//         props.posts.map((post, i, arr) => (
//           <PostListItem post={post} key={i}
//             onClick={function handleClick() {
//               props.dispatch(Actions.addSelectedPost(post))
//             }}
//             onDelete={function handleDelete() {
//               if (confirm('Do you want to delete this post')) { // eslint-disable-line
//                 props.dispatch(Actions.deletePostRequest(post))
//               }
//             }}
//           />
//         ))
//       }