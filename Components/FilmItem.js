// Components/FilmItem.js

import React, { PureComponent } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'

class FilmItem extends PureComponent {
  render() {
    
    const { film, displayDetailForFilm } = this.props
    console.log(film)

    return (
      <TouchableOpacity style={styles.main_container} onPress={() => displayDetailForFilm(film.id)}>
        <Image style={styles.image} source={{uri: getImageFromApi(film.poster_path)}} />
        <View style={styles.info_container}>
          <View style={styles.header_container}>
            <Text style={[styles.title_text, styles.text_light]} numberOfLines={2} >{film.original_title}</Text>
            <Text style={styles.vote_text}>{film.vote_average}</Text>
          </View>
          <View style={styles.description_container}>
            <Text style={[styles.description_text, styles.text_light]} numberOfLines={5} >{film.overview}</Text>
          </View>
          <View style={styles.date_container}>
            <Text style={[styles.date_text, styles.text_light]}>{film.release_date} </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: '#444',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    flex: 2,
    backgroundColor: 'gray',
    marginRight: 10
  },
  info_container: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  header_container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title_text: {
    flex: 2,
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 5
  },
  vote_text: {
    color: "gold"
  },
  description_container: {
    flex: 4,
  },
  date_container: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  date_text: {
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  text_light: {
    color: '#fff'
  }
})

export default FilmItem