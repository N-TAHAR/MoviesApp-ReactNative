// Animations/shrinkEnlarge.js

import React from 'react'
import { Animated, Dimensions } from 'react-native'

class ShrinkEnlarge extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      viewSize: new Animated.Value(this._getSize())
    }
  }

  _getSize(){
    if(this.props.shouldEnlarge){
      return 1.5
    }
    return 1
  }

  componentDidUpdate() {
    Animated.spring(
      this.state.viewSize,
      {
        toValue: this._getSize()
      }
    ).start()
  }

  render() {
    return (
      <Animated.View
        style={{ transform: [{scale: this.state.viewSize}] }}>
          {this.props.children}
      </Animated.View>
    )
  }
}

export default ShrinkEnlarge