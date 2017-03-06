import * as API from '../utils/api'
export const IDS_REQUEST = 'IDS_REQUEST'
export const IDS_SUCCESS = 'IDS_SUCCESS'
export const IDS_FAILURE = 'IDS_FAILURE'


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
        console.log(data)
        dispatch(idsSuccess(category, data))
      })
  }
  
}
export function fetchIdsByCategory (category) {
  return (dispatch) => {
    return dispatch(fetchIdsByCategoryForReal(category))
  }
}