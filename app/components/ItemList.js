import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { timeAgo, host } from '../utils'
import { fetchIdsAndItsFirstItems, fetchItems } from '../actions'

class ItemList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentWillMount() {
    const { dispatch, getState, category, itemsPerPage, ids} = this.props
    const id = this.props.params.id
    dispatch(fetchIdsAndItsFirstItems(category))
      .then(() => {
        this.setState({
          data: this.props.activeItems
        })
      })
  }

  componentWillReceiveProps(nextProps) {
    const id = nextProps.params.id
    if (id !== this.props.params.id) {
      const { dispatch, activeItems, itemsPerPage, ids} = nextProps
      const start = typeof id === 'undefined' ? 0 : (id - 1) * itemsPerPage
      const end = Math.min(ids.length, start + itemsPerPage)
      // fetchItems(ids.slice(start, end))
      //   .then(data => this.setState({data: data}))
      dispatch(fetchItems(ids.slice(start, end)))
        .then(() => {
          this.setState({
            data: this.props.activeItems
          })
        })
    }
    
  
  }

  render() {
    const { ids, itemsPerPage, category } = this.props
    const id = Number (typeof this.props.params.id === 'undefined' ? 1 : this.props.params.id)

    let content = null
    if (this.state.data.length === 0) {
      content = <div>Loading ... </div>
    } else {
      const items = this.state.data.map((d, i) => (
        <li key={i} data-index={i}>
          <span className='score'>{d.score}</span>
          <span className='title'>
            <a href={d.url} target='_blank' className='title'>{d.title}</a>
            {'  '}
            {/*<span className='host'>({ host(d.url)})</span>*/}
          </span>
          <br />
          <span className='meta'>
            <span className='author'>
              by <Link to={'/user/' + d.by}>{d.by} </Link>
              {timeAgo(d.time) + ' ago '} 
            </span>
            {'| '} 
            <span className='comments'>
              <Link to={'/item/' + d.id}>{ d.descendants} comments</Link>
             </span>
          </span>
          
        </li>
      ))
      content = <ul className='news-list'>{items}</ul>
        
    }
    const nextPage = id + 1
    const prevPage = id - 1

    const prevBtn = prevPage <= 0 ? 
      <Link className='disabled'>prev</Link> : <Link to={'/' + category +  '/' + prevPage}>prev </Link> 
    const nextBtn = nextPage > Math.ceil(ids.length / itemsPerPage) ?
      <Link className='disabled'>next</Link> : <Link to={'/' + category +  '/' + nextPage}>next</Link>

    return (
      <div>
        <div className='pagination-bar'>
          { prevBtn }
          {'   '}
          <span>{typeof id === 'undefined' ? 1 : id } / {Math.ceil(ids.length / itemsPerPage)}</span>
          {'   '}
          { nextBtn }
        </div>
        { content }
      </div>
    )
  }
}

ItemList.propTypes = {
  ids: PropTypes.array.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  activeCategory: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired
  
}

ItemList.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  const { lists, activeCategory, itemsPerPage, activeItems} = state
  return  {
    ids: lists[activeCategory],
    itemsPerPage,
    activeCategory,
    activeItems
  }
}

export default connect(mapStateToProps)(ItemList)