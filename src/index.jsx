import React from 'react'
import content from './content.jsx'
import { init } from './main'

class Index extends React.Component {
  render() {
    const Content = React.createFactory(content)
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8"/>
          <meta content="ie=edge" httpEquiv="x-ua-compatible"/>
          <meta content="Hello, world!" name="description"/>
          <meta content="width=device-width, initial-scale=1" name="viewport"/>
          <title>Hello, world!</title>
          <link rel="icon" href={require('./favicon.ico')}/>
          {this.props.styles.map((style, i) => {
            return (<link key={i} rel="stylesheet" href={style}/>)
          })}
        </head>
        <body>
          <main id="main" dangerouslySetInnerHTML={{
            __html: React.renderToString(Content())
          }}/>
          {this.props.scripts.map((script, i) => {
            return (<script key={i} src={script} defer={true}/>)
          })}
        </body>
      </html>
    )
  }
}

Index.propTypes = {
  scripts: React.PropTypes.array
}

Index.defaultProps = {
  scripts: []
}

// If we're running in the browser, initialize the app.
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  init()
}

export default Index
