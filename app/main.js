import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import styles from './styles.scss'
import api, { fetchItem, fetchIdsByType } from './utils/api'
import { browserHistory, Router, Route, IndexRoute, Link, IndexRedirect } from 'react-router'

// fetchItem('160705')
//   .then((json) => console.log(json))

// fetchIdsByType('top')
//   .then((json) => console.log(json))
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRedirect to='/top' />
      <Route path='top' component={App} >
        <Route path='page/:id' component={App} />
      </Route>
    </Route>
  </Router>
    ,document.getElementById('root'))