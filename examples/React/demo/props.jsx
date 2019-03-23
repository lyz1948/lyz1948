import * as React from 'react'
import ReactDOM from 'react-dom'

class Child extends React.Component {
  updateName() {
    this.props.changeName('abc')
  }

  render() {
    return (
      <div>
        Hello React! I am a {this.props.name}
        <br/>
        <button onClick={this.updateName.bind(this)}>点我改变名字</button>
      </div>
    )
  }
}

class Page extends React.Component {
  constructor(props) {
    super(props)
    this.state = {name: 'lyz'}
  }

  _changeName(name) {
    this.setState({
      name
    })
  }
  render() {
    return (
      <Child name={this.state.name} changeName={this._changeName.bind(this)}/>
    )
  }
}

ReactDOM.render(
  <Page/>,
  document.getElementById('app')
)
