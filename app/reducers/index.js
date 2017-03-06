import { combineReducers } from 'redux'

import { IDS_SUCCESS } from '../actions'
// a constant showing number of items on each page
function itemsPerPage() {
  return 20
}

function activeType(state = 'top', action) {
  switch (action.type) {
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
      console.log('success')
      return {
        ...state,
       [action.category]: action.data 
      }
    default:
      return state
  }
}


export default combineReducers({
  itemsPerPage,
  activeType,
  lists
})