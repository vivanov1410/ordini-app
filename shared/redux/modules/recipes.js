import fetch from 'isomorphic-fetch'

// ------------------------------------
// Constants
// ------------------------------------
const FETCH_RECIPES_REQUEST = 'ordini-app/recipes/FETCH_RECIPES_REQUEST'
const FETCH_RECIPES_SUCCESS = 'ordini-app/recipes/FETCH_RECIPES_SUCCESS'
const FETCH_RECIPES_FAIL = 'ordini-app/recipes/FETCH_RECIPES_FAIL'

const CREATE_RECIPE = 'ordini-app/recipes/CREATE_RECIPE'
const CREATE_RECIPE_REQUEST = 'ordini-app/recipes/CREATE_RECIPE_REQUEST'
const CREATE_RECIPE_SUCCESS = 'ordini-app/recipes/CREATE_RECIPE_SUCCESS'
const CREATE_RECIPE_FAIL = 'ordini-app/recipes/CREATE_RECIPE_FAIL'

// ------------------------------------
// Actions
// ------------------------------------
export const requestRecipes = () => ({
  type: FETCH_RECIPES_REQUEST,
})

export const reciveRecipes = (recipes) => ({
  type: FETCH_RECIPES_SUCCESS,
  payload: recipes,
})

export const fetchRecipes = () => {
  return (dispatch) => {
    dispatch(requestRecipes())

    return fetch('/api/recipes')
      .then(response => response.json())
      .then(json => dispatch(reciveRecipes(json)))
  }
}

export const createRecipeSync = (recipe) => ({
  type: CREATE_RECIPE,
  payload: recipe,
})

export const requestCreateRecipe = () => ({
  type: CREATE_RECIPE_REQUEST,
})

export const createRecipeSuccess = (recipe) => ({
  type: CREATE_RECIPE_SUCCESS,
  payload: recipe,
})

export const createRecipeFail = (err) => ({
  type: CREATE_RECIPE_FAIL,
  error: err,
})

export const createRecipe = (recipe) => {
  return (dispatch) => {
    dispatch(createRecipeSync(recipe))
    dispatch(requestCreateRecipe())

    return fetch('/api/recipes', {
      method: 'POST',
      body: JSON.stringify(recipe),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => dispatch(createRecipeSuccess(json)))
      .catch(err => dispatch(createRecipeFail(err)))
  }
}

export const actions = {
  fetchRecipes,
  createRecipe,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_RECIPES_REQUEST]: (state) => {
    return {
      ...state,
      fetching: true,
    }
  },

  [FETCH_RECIPES_SUCCESS]: (state, action) => {
    return {
      ...state,
      fetching: false,
      data: action.payload,
      receivedAt: Date.now(),
    }
  },

  [CREATE_RECIPE]: (state, action) => {
    return {
      data: [{
        name: action.payload.name,
      }].concat(state.data),
    }
  },

  [CREATE_RECIPE_REQUEST]: (state) => {
    return {
      ...state,
      fetching: true,
    }
  },

  // [CREATE_RECIPE_SUCCESS]: (state, action) => {
  //   return {
  //     ...state,
  //     fetching: false,
  //     data: action.payload,
  //   }
  // },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  fetching: false,
  data: [],
}

export default function counterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
