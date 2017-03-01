import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import styles from './styles.scss'
import api, { fetchItem, fetchIdsByType } from './utils/api'

console.log('0---', api)

fetchItem('160705')
  .then((json) => console.log(json))

fetchIdsByType('top')
  .then((json) => console.log(json))
ReactDOM.render(<App />, document.getElementById('root'))