import * as API from '../utils/api'

export const CATEGORY_UPDATE = 'CATEGORY_UPDATE'
export const IDS_REQUEST = 'IDS_REQUEST'
export const IDS_SUCCESS = 'IDS_SUCCESS'
export const IDS_FAILURE = 'IDS_FAILURE'


const updateActiveCategory = category => ({
  type: CATEGORY_UPDATE,
  category
})
const idsRequest = category => ({
  type: IDS_REQUEST,
  category
})

const idsSuccess = (category, data) => ({
  type: IDS_SUCCESS,
  category,
  data,
  receivedAt: Date.now()
})

function fetchIdsByCategoryForReal (category) {
  idsRequest(category)
  return dispatch => {
    return API.fetchIdsByCategory(category)
      .then(data => {
        dispatch(idsSuccess(category, data))
      })
  }
  
}
export function fetchIdsByCategory (category) {
  return (dispatch) => {
    dispatch(updateActiveCategory(category))
    return dispatch(fetchIdsByCategoryForReal(category))
  }
}