import React from 'react'
import Verovio from './Verovio'
import TeiElement from './TeiElement'
import './Music.scss'

class Music extends React.Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  componentDidMount() {
    this.renderMusic(this.props.notatedMusic.querySelector('tei-ptr').getAttribute('target'))
  }

  forwardTeiAttributes() {
    return Array.from(this.props.notatedMusic.attributes).reduce((acc, att) => {
      acc[att.name] = att.value
      return acc
    }, {})
  }

  async renderMusic(url) {
    const meiData = await fetch(`/data/${this.props.teiPath}${url}`).then(response => response.text())

    // This is an example
    const type = this.props.notatedMusic.getAttribute('type')
    let pageWidth = 800
    if (type === 'tipo1') {
      pageWidth = 400
    } else if (type === 'tipo2') {
      pageWidth = 100
    }

    Verovio.loadData(meiData)
    Verovio.setOptions({
      pageWidth,
      adjustPageHeight: true,
      scale: 50
    })
    this.setState({meiData, svg: Verovio.renderPage(1)}) 
  }

  render() {
    const url = this.props.notatedMusic.querySelector('tei-ptr').getAttribute('target')
    const label = <TeiElement teiDomElement={this.props.notatedMusic.querySelector('tei-label')} teiPath={this.props.teiPath} />
    let music = ''
    // notatedMusic renders contained elements as fallbacks. Start with the first and continue.
    const musicFormats = this.props.notatedMusic.querySelectorAll('tei-ptr, tei-graphic')
    for (const mf of Array.from(musicFormats)) {
      if (mf.tagName.toLowerCase() === 'tei-graphic') {
        music = <TeiElement teiDomElement={this.props.notatedMusic.querySelector('tei-graphic')} />
        break
      }
      if (mf.tagName.toLowerCase() === 'tei-ptr' && this.state.svg) {
        music = <div dangerouslySetInnerHTML={{__html: this.state.svg}}/>
        break
      }
      continue
    }
    const header = (<div className="MusicHeader">
      {label} &nbsp; <a href={`/data/${this.props.teiPath}${url}`}>MEI</a>
    </div>)
    const children = (<>{header}{music}</>)
    return React.createElement(this.props.notatedMusic.tagName.toLowerCase(), 
      {
        ...this.forwardTeiAttributes(),
      }, 
      children
    )
  }
}

export default Music
