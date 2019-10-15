// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, Image, Share, TouchableOpacity } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import { ScrollView } from 'react-native-gesture-handler'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart as fasFaHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons'
import ShrinkEnlarge from '../Animations/ShrinkEnlarge'

library.add(fasFaHeart, farFaHeart)

const mapStateToProps = (state) => {
  return {
    favorisFilm: state.favorisFilm
  }
}

class FilmDetail extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    // On accède à la fonction shareFilm et au film via les paramètres qu'on a ajouté à la navigation
    if (params.film != undefined) {
      return {
          // On a besoin d'afficher une image, il faut donc passe par une Touchable une fois de plus
          headerRight: <TouchableOpacity
                          style={styles.share_touchable_headerrightbutton}
                          onPress={() => params.shareFilm()}>
                          <Image
                            style={styles.share_image}
                            source={require('../assets/images/export.png')} />
                        </TouchableOpacity>
      }
    }
  }

  constructor(props){
    super(props)
    this.state = {
      film: undefined,
      isLoading: false
    }
    this._shareFilm = this._shareFilm.bind(this)
  }

  componentDidMount(){
    const favorisFilmIndex = this.props.favorisFilm.findIndex(item => item.id === this.props.navigation.state.params.idFilm)
    if (favorisFilmIndex !== -1) { 
      this.setState({
        film: this.props.favorisFilm[favorisFilmIndex]
      },() => { this._updateNavigationParams() })
      return
    }
    this.setState({ isLoading: true })
    getFilmDetailFromApi(this.props.navigation.getParam('idFilm'))
    .then(data => {
      this.setState({
        film: data,
        isLoading: false
      }, () => { this._updateNavigationParams() })
    })
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

  _updateNavigationParams() {
    this.props.navigation.setParams({
      shareFilm: this._shareFilm,
      film: this.state.film
    })
  }

  _shareFilm() {
    const { film } = this.state
    Share.share({ title: film.title, message: film.overview })
  }

  _toggleFavoris() {
    const action = { type: "TOGGLE_FAVORIS", value: this.state.film }
    this.props.dispatch(action)
  }

  _displayFavorisIcon(){
    let favorisIcon = farFaHeart
    let shouldEnlarge = false
    if (this.props.favorisFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
      // Film dans nos favoris
      favorisIcon = fasFaHeart
      shouldEnlarge = true
    }

    return (
      <ShrinkEnlarge shouldEnlarge={shouldEnlarge}>
        <FontAwesomeIcon icon={ favorisIcon } color={ 'pink' } size={ 30 } style={ styles.heart_icon } onPress={() => this._toggleFavoris()}/>
      </ShrinkEnlarge>
    )
  }

  componentDidUpdate() {
    console.log("componentDidUpdate : ")
    console.log(this.props.favorisFilm.length)
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
              <View style={styles.aside_container}>
                <View style={styles.vote_container}>
                  <AirbnbRating
                    count={5}
                    defaultRating={Math.round(film.vote_average/2)}
                    reviews={["Nul", "Pas ouf", "Ça va", "Propre", "Excellent"]}
                    size={20}
                    reviewSize={20}
                    isDisabled
                  />
                  <Text style={[styles.text_light, styles.vote_count]}>({film.vote_count})</Text>
                </View>
                {this._displayFavorisIcon()}
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
  aside_container: {
    flex: 1,
    alignItems: 'center'
  },
  vote_container: {
    marginBottom: 25
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
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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
  },
  share_touchable_headerrightbutton: {
    marginRight: 15
  },
  share_image: {
    height: 25,
    width: 25
  }
})

export default connect(mapStateToProps)(FilmDetail)

