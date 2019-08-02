import React from 'react'
import Music from './Music'

class TeiElement extends React.Component {
  forwardTeiAttributes() {
    return Array.from(this.props.teiDomElement.attributes).reduce((acc, att) => {
      acc[att.name] = att.value
      return acc
    }, {})
  }

  render() {
    // Special case for notatedMusic
    if (this.props.teiDomElement.tagName.toLowerCase() === 'tei-notatedmusic') {
      return <Music notatedMusic={this.props.teiDomElement}/>
    } 

    const teiChildren = Array.from(this.props.teiDomElement.childNodes).map((teiEl, i) => { 
      switch (teiEl.nodeType) {
        case 1:
          return <TeiElement teiDomElement={teiEl} key={`${teiEl.tagName}_${i}`} />
        case 3:
          return teiEl.nodeValue
        default:
          return null
      }        
    })

    return React.createElement(this.props.teiDomElement.tagName.toLowerCase(), 
      {
        ...this.forwardTeiAttributes(),
      }, 
      teiChildren
    )
  }
}

export default TeiElement
