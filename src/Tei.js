import React from 'react'
import CETEI from 'CETEIcean'
import TeiElement from './TeiElement'
import './teiStyles/Base.scss'
import './teiStyles/Diplomatic.scss'
import './teiStyles/Diplomatic2.scss'
import './teiStyles/Edited.scss'
import './teiStyles/Modernized.scss'

class Tei extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.allowedViews = this.props.allowedViews.map(view => {
      return view.url
    })
    this.teiPath = this.props.tei.split('/').slice(0, -1).join('/') + "/"
  }

  componentDidMount() {
    this.getTEI()
  }

  async getTEI() {
    const ct = new CETEI()
    
    // Override default CETEI TEI behaviors.
    ct.addBehavior('tei', 'teiHeader', undefined)

    const teiData = await ct.getHTML5(`/data/${this.props.tei}`)
    this.setState({
      teiData
    })
  }

  render() {
    let view = this.props.defaultView
    if (this.allowedViews.indexOf(this.props.view) > -1) {
      view = this.props.view
    }
    const teiContent = this.state.teiData 
      ? <TeiElement teiDomElement={this.state.teiData} teiPath={this.teiPath} />
      : 'Loading ...' 
    const viewStyle = view.charAt(0).toUpperCase() + view.substr(1).toLowerCase()
    return <div className={`Tei ${viewStyle}`}>{teiContent}</div>
  }
}

export default Tei
