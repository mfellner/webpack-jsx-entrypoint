import React from 'react'

class Content extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <p>This is a demo.</p>
      </div>
    )
  }

  componentDidMount() {
    console.log('Content mounted');
  }
}

export default Content
