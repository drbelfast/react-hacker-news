import React, { Component } from 'react'

export default class ItemList extends Component {

  render() {
    const ITEMS_PER_PAGE = 20
    const { ids } = this.props
    let content = null
    if (ids.length === 0) {
      content = <div>Loading...</div>
    } else {
      content = ids.map((id, index) => {
        return (
          <div key={index} className={index}>
            {/*{id}*/}
          </div>
        )
      })
    }
    return (
      <div>
        <div className='pagination-bar'>
          <a href='#'>prev</a>
          <span>1 / {Math.ceil(ids.length / ITEMS_PER_PAGE)}</span>
          <a href='#'>next</a>
        </div>
        {content} 
      </div>
    )
  }
}