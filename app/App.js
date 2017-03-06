import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'


export default class App extends Component {
  
  render() {
    return (
      <div className="app-container">
        <nav className='header'>
          <ul>
            <li><Link to={'/top'}>Top</Link></li>
            <li><Link to={'/new'}>New</Link></li>
            <li><Link to={'/show'}>Show</Link></li>
            <li><Link to={'/ask'}>Ask</Link></li>
            <li><Link to={'/job'}>Jobs</Link></li>
          </ul>
        </nav>
        { this.props.children && React.cloneElement(this.props.children)}
      </div>
    )
  }
}


