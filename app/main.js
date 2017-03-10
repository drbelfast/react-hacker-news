import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store'

import { browserHistory, Router, Route, IndexRoute, Link, IndexRedirect } from 'react-router'
import App from './App'
import api, { fetchItem, fetchIdsByType } from './utils/api'
import { createListView } from './components/createListView'
import CommentsView from './components/CommentsView'
import styles from './styles.scss'


const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRedirect to='/top' />
        <Route path='top(/:id)' component={createListView('top')} />
        <Route path='new(/:id)' component={createListView('new')} />
        <Route path='show(/:id)' component={createListView('show')} />
        <Route path='ask(/:id)' component={createListView('ask')} />
        <Route path='job(/:id)' component={createListView('job')} />
        <Route path='item/:id' component={CommentsView} />
      </Route>
    </Router>
  </Provider>
    ,document.getElementById('root'))