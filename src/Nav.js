import React from 'react'
import './Nav.scss'
import { Link } from "react-router-dom"


class App extends React.Component {
  render() {
    return (
      <nav className="Nav">
        <ul>
          {this.props.views.map((view, i) => {
            let isActive = ''
            if ((!this.props.activeView && view.url === this.props.defaultView)
              || this.props.activeView === view.url) {
              isActive = 'active'
            }
            return (
              <li key={`l-${i}`} className={isActive}>
                <Link to={view.url}>{view.label}</Link>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  } 
}

export default App;
