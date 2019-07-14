import React from 'react'
import './App.scss'
import Body from './Body'
import { BrowserRouter as Router, Route } from "react-router-dom"


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
      <Router>
        <div className="App">
          <Route path="/:view?" exact component={(p) => 
            <Body 
              defaultView={this.defaultView}
              view={p.match.params.view} />} />
        </div>
      </Router>
    )
  } 
}

export default App;
