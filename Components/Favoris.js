// Components/Favoris.js

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FilmList from './FilmList'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    favorisFilm: state.favorisFilm
  }
}

class Favoris extends React.Component {

  render() {
    return (
      <View style={styles.body_container}>
        <FilmList
          films={this.props.favorisFilm}
          navigation={this.props.navigation}
          favoriteList={true}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  body_container: {
    flex: 1,
    backgroundColor: '#101010',
    padding: 10
  }
})

export default connect(mapStateToProps)(Favoris)