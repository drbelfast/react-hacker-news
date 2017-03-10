import * as API from '../utils/api'

export const CATEGORY_UPDATE = 'CATEGORY_UPDATE'
export const IDS_REQUEST = 'IDS_REQUEST'
export const IDS_SUCCESS = 'IDS_SUCCESS'
export const IDS_FAILURE = 'IDS_FAILURE'


const updateActiveCategory = category => ({
  type: CATEGORY_UPDATE,
  category
})

/**
 * fetch Ids
 */
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

const fetchIdsByCategoryForReal = category => dispatch => {
  dispatch(idsRequest(category))
  return API.fetchIdsByCategory(category)
    .then(data => {
      dispatch(idsSuccess(category, data))
    })
}


export function fetchIdsByCategory (category) {
  return (dispatch) => {
    dispatch(updateActiveCategory(category))
    return dispatch(fetchIdsByCategoryForReal(category))
  }
}

/**
 * fetch Items by given ids
 */

export const ITEMS_REQUEST = 'ITEMS_REQUEST'
export const ITEMS_SUCCESS = 'ITEMS_SUCCESS'
export const ITEMS_FAILURE = 'ITEMS_FAILURE'

const itemsRequest = () => ({
  type: ITEMS_REQUEST
})

const itemsSuccess = (data) => ({
  type: ITEMS_SUCCESS,
  data
})

export const fetchItems = ids => dispatch => {
  dispatch(itemsRequest())
  return API.fetchItems(ids)
    .then(data => {
      dispatch(itemsSuccess(data))
    })
}


export const fetchIdsAndItsFirstItems = category => (dispatch, getState) => {
  return dispatch(fetchIdsByCategoryForReal(category)).then(() => {
    const activeCategory = getState().activeCategory
    const itemsPerPage = getState().itemsPerPage
    const ids = getState().lists[activeCategory].slice(0, itemsPerPage)
    return dispatch(fetchItems(ids))
  })
  /**
   * .then(() => {
    const activeCategory = getState().activeCategory
    consoel.log(activeCategory + ' is here')
   */
}