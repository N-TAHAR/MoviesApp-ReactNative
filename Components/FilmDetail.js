// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, Image } from 'react-native'
import { Rating, AirbnbRating } from 'react-native-ratings'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import { ScrollView } from 'react-native-gesture-handler'
import moment from 'moment'
import numeral from 'numeral'

class FilmDetail extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      film: undefined,
      isLoading: true
    }
  }

  _displayLoading(){
    if (this.state.isLoading){
      return (
        <View style={styles.loading_container} pointerEvents="none">
          <ActivityIndicator size='large' color='gold' />
        </View>
      )
    }
  }

  _displayFilmDetail(film){
    if(film !== undefined){
      return(
        <ScrollView style={styles.scrollview_container}>
          <Text style={[styles.title, styles.text_light]}>{film.title}</Text>
          <Image 
            style={styles.image}
            source={{uri: getImageFromApi(film.backdrop_path)}}
            resizeMode="cover"
          />
          <View style={styles.body_container}>
            <View style={styles.info_container}>
              <View style={styles.info}>
                <Text style={[styles.list_item, styles.text_light]} >
                  <Text style={styles.text_bold}>Production(s) : </Text>
                  {film.production_companies.map( (production) => {
                    return production.name
                  }).join(' / ')}
                </Text>
                <Text style={[styles.list_item, styles.text_light]} >
                  <Text style={styles.text_bold}>Genre(s) : </Text>
                  {film.genres.map( (genre) => {
                    return genre.name
                  }).join(' / ')}
                </Text>
                <Text style={[styles.list_item, styles.text_light]} >
                  <Text style={styles.text_bold}>Date de sortie : </Text>
                  {moment(film.release_date).format('DD/MM/YYYY')}
                </Text>
                <Text style={[styles.list_item, styles.text_light]} >
                  <Text style={styles.text_bold}>Budget : </Text>
                  {numeral(film.budget).format('0,0[.]00 $')}
                </Text>
                <Text style={[styles.text_light]} >
                  <Text style={styles.text_bold}>Revenu : </Text>
                  {numeral(film.revenue).format('0,0[.]00 $')}
                </Text>
              </View>
              <View style={styles.vote_container}>
                <AirbnbRating
                  count={5}
                  defaultRating={Math.round(film.vote_average/2)}
                  reviews={["Nul", "Pas ouf", "Ça va", "Propre", "Excellent"]}
                  size={20}
                  reviewSize={20}
                />
                <Text style={[styles.text_light, styles.vote_count]}>({film.vote_count})</Text>
              </View>
            </View>
            <View style={styles.overview_container}>
              <Text style={[styles.text_light, styles.text_bold, {color: 'gold'}]}>Synopsis</Text>
              <Text style={[styles.text_light, styles.overview]}>{film.overview}</Text>
            </View>
          </View>
        </ScrollView>
      )
    }
  }

  componentDidMount(){
    getFilmDetailFromApi(this.props.navigation.getParam('idFilm'))
    .then(data => {
      console.log(data)
      this.setState({
        film: data,
        isLoading: false
      })
    })
  }

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilmDetail(this.state.film)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#101010'
  },
  scrollview_container: {

  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    flex: 1,
    height: 200
  },
  body_container: {
    padding: 10,
  },
  info_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  info: {
    flex: 2,
    marginTop: 10,
    marginRight: 5
  },
  list_item: {
    marginBottom: 5
  },
  vote_container: {
    flex: 1
  },
  vote_count: {
    textAlign: 'center'
  },
  overview_container: {
    marginTop: 10
  },
  overview: {
    textAlign: 'justify'
  },
  text_light: {
    color: '#fafafa'
  },
  text_bold: {
    fontWeight: 'bold'
  },
  loading_container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default FilmDetail