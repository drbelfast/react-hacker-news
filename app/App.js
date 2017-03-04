import React, { Component } from 'react'

import ItemList from './components/ItemList'
import api, { fetchItem, fetchIdsByType } from './utils/api'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ids: []
    }
  }
  componentWillMount() {
    fetchIdsByType('top')
      .then((data) => this.setState({ids: data}))
  }

  render() {
    return (
      <div className="app-container">
        <nav>
          <ul>
            <li>Top</li>
            <li>New</li>
            <li>Show</li>
            <li>Ask</li>
            <li>Jobs</li>
          </ul>
        </nav>
        { this.props.children && React.cloneElement(this.props.children, {
          ids: this.state.ids
        })}
      </div>
    )
  }
}
