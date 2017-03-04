import React, { Component } from 'react'
import { fetchItems } from '../utils/api'

export default class ItemList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageId: 1,
      data: []
    }
  }
  
  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps.params)
    if (typeof nextProps.params.id !== 'undefined') {
      this.state.pageId = nextProps.params.id
    }
  }
  render() {
    const ITEMS_PER_PAGE = 20
    const { ids } = this.props
    let content = null
    if (ids.length === 0) {
      // if is fetching ids
      content = <div>Loading...</div>
    } else {
      const start = this.state.pageId - 1
      const end = Math.min(ids.length, this.state.pageId * ITEMS_PER_PAGE)
      fetchItems(ids.slice(start, end))
        .then(data => this.setState({data: data}))
    }
    if (this.state.data.length === 0) {
      content = <div>Loading ... </div>
    } else {
      console.log(this.state.data)
      const items = this.state.data.map((d, i) => <li key={i}>{d.title}</li>)
      content = <ul className='news-list'>{items}</ul>
        
    }
    return (
      <div>
        <div className='pagination-bar'>
          <a href='#'>prev</a>
          <span>1 / {Math.ceil(ids.length / ITEMS_PER_PAGE)}</span>
          <a href='#'>next</a>
        </div>
        { content }
      </div>
    )
  }
}