import React, { Component } from 'react'
import { fetchItems } from '../utils/api'
import { Link } from 'react-router'

export default class ItemList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      foo: null
    }
  }

  componentWillReceiveProps(nextProps) {
    const id = nextProps.params.id
    const { ids, ITEMS_PER_PAGE } = nextProps
    const start = typeof id === 'undefined' ? 0 : (id - 1) * ITEMS_PER_PAGE
    const end = Math.min(ids.length, start + ITEMS_PER_PAGE)
    fetchItems(ids.slice(start, end))
      .then(data => this.setState({data: data}))
    
  }

  render() {
    const { ids, ITEMS_PER_PAGE } = this.props
    const id = Number (typeof this.props.params.id === 'undefined' ? 1 : this.props.params.id)

    let content = null
    if (this.state.data.length === 0) {
      content = <div>Loading ... </div>
    } else {
      const items = this.state.data.map((d, i) => <li key={i} data-index={i}>{d.title}</li>)
      content = <ul className='news-list'>{items}</ul>
        
    }
    const nextPage = id + 1
    const prevPage = id - 1

    const prevBtn = prevPage <= 0 ? 
      <Link className='disabled'>prev</Link> : <Link to={'/top/page/' + prevPage}>prev </Link> 
    const nextBtn = nextPage > Math.ceil(ids.length / ITEMS_PER_PAGE) ?
      <Link className='disabled'>next</Link> : <Link to={'/top/page/' + nextPage}>next</Link>

    return (
      <div>
        <div className='pagination-bar'>
          { prevBtn }
          {'   '}
          <span>{typeof id === 'undefined' ? 1 : id } / {Math.ceil(ids.length / ITEMS_PER_PAGE)}</span>
          {'   '}
          { nextBtn }
        </div>
        { content }
      </div>
    )
  }
}