import React from 'react'
import jquery from 'jQuery'

const spinner = {
  src: require('./spinner.gif')
}

class Content extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      img: {}
    }
  }

  render() {
    return (
      <div style={{padding: '1em', textAlign: 'center'}}>
        <h1>Hello, world!</h1>
        <div>
          <p>This is a demo.
            <button style={{marginLeft: '12px'}} onClick={this.onButtonPressed.bind(this)}>
              click me
            </button>
          </p>
        </div>
        <div style={{textAlign:'center'}}>
          <img src={this.state.img.src} alt="giphy"/>
        </div>
      </div>
    )
  }

  componentDidMount() {
    console.log('Content mounted');
  }

  onButtonPressed() {
    this.setState({img: spinner})

    const tag = 'cat'
    const key = 'dc6zaTOxFJmzC'
    const url = `http://api.giphy.com/v1/stickers/random?api_key=${key}&tag=${tag}`

    jquery.ajax({url: url}).then(response => {
      this.setState({
        img: {
          src: response.data.fixed_height_downsampled_url
        }
      })
    })
  }
}

export default Content
