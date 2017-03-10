import { combineReducers } from 'redux'

import { CATEGORY_UPDATE, IDS_SUCCESS, ITEMS_SUCCESS } from '../actions'
// a constant showing number of items on each page
function itemsPerPage() {
  return 20
}

function activeCategory(state = 'top', action) {
  switch (action.type) {
    case CATEGORY_UPDATE:
      console.log(action.category)
      return action.category
    default:
      return state
  }
}
const initialState = {
  top: [],
  new: [],
  show: [],
  ask: [],
  job: []
}

function lists(state = initialState, action){
  switch (action.type) {
    case IDS_SUCCESS:
      return {
        ...state,
       [action.category]: action.data 
      }
    default:
      return state
  }
}

const activeItems = (state = [], action) => {
  switch(action.type) {
    case ITEMS_SUCCESS:
      return [...action.data]
    default:
      return state
  }
}


export default combineReducers({
  itemsPerPage,
  activeCategory,
  lists,
  activeItems
})