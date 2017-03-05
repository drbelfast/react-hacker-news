import React, { Component } from 'react'
import { Link } from 'react-router'
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
        <nav className='header'>
          <ul>
            <li><Link to={'/top'}>Top</Link></li>
            <li><Link to={'/new'}>New</Link></li>
            <li><Link to={'/show'}>Show</Link></li>
            <li><Link to={'/ask'}>Ask</Link></li>
            <li><Link to={'/jobs'}>Jobs</Link></li>
          </ul>
        </nav>
        { this.props.children && React.cloneElement(this.props.children, {
          ids: this.state.ids,
          ITEMS_PER_PAGE: 20
        })}
      </div>
    )
  }
}
