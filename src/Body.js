import React from 'react'
import Tei from './Tei'
import Nav from './Nav'


class Body extends React.Component {
  constructor(props) {
    super(props)
    this.views = [
      {
        url: 'diplomatic',
        label: 'Diplomatic'
      },
      {
        url: 'diplomatic2',
        label: 'Diplomatic 2'
      },
      {
        url: 'edited',
        label: 'Edited'
      },
      {
        url: 'modernized',
        label: 'Modernized'
      },
    ]
    this.defaultView = 'diplomatic'
  }

  render() {
    return (
      <>
        <Nav views={this.views} activeView={this.props.view} defaultView={this.defaultView}/>
        <Tei 
            tei={this.props.tei}
            defaultView={this.props.defaultView}
            view={this.props.view} 
            allowedViews={this.views} />
      </>
    )
  } 
}

export default Body
