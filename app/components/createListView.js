import ItemList from './ItemList'
import React, { Component } from 'react'

export function createListView(type) {
  return class extends Component {
    render() {
      return <ItemList category={type} {...this.props} />
    }
  }
}