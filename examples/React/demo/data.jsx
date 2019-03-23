import * as React from 'react'
import ReactDOM from 'react-dom'

let name = 'lyz'

class Page extends React.Component {
  render() {
    return (
      <div>
        Hello!  I am { name }
      </div>
    )
  }
}

ReactDOM.render(
  <Page/>,
  document.getElementById('app')
)
