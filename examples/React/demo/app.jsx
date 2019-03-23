import * as React from 'react'
import ReactDOM from 'react-dom'

class Page extends React.Component {
  render() {
    return (
      <div>
        Hello React! I am a Component
      </div>
    )
  }
}

ReactDOM.render(
  <Page/>,
  document.getElementById('app')
)
