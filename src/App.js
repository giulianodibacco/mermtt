import React from 'react'
import './App.scss'
import Body from './Body'
import { HashRouter as Router, Route } from "react-router-dom"


class App extends React.Component {
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
      <Router hashType="noslash">
        <div className="App">
          <Route path="/:view?" component={(p) => 
            <Body 
              tei={this.props.tei}
              defaultView={this.defaultView}
              view={p.match.params.view} />} />
        </div>
      </Router>
    )
  } 
}

export default App;
