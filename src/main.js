import React from 'react'
import content from './content.jsx'

export function init() {
  const Content = React.createFactory(content)
  React.render(Content(), document.getElementById('main'));
}
