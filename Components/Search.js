// Components/Search.js
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { StyleSheet, View, TextInput, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import { connect } from 'react-redux'
import FilmList from './FilmList'


const mapStateToProps = (state) => {
  return {
    favorisFilm: state.favorisFilm
  }
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      isLoading: false
    }
    this.searchedText = ''
    this.page = 0
    this.totalPages = 0
    this._loadFilms = this._loadFilms.bind(this)
  }

  _loadFilms() {
    if (this.searchedText.length > 0){
      this.setState({ 
        isLoading: true
      })
      getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
        this.page = data.page
        this.totalPages = data.total_pages
        this.setState({
          films: [ ...this.state.films, ...data.results ],
          isLoading: false
        }, () => {
        })
      });
    }
  }

  _searchTextInputChanged(text){
    this.searchedText = text
  }

  _searchFilms() {
    this.page = 0
    this.totalPages = 0
    this.setState({
      films: []
    }, () => {
      this._loadFilms()
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

  _displayDetailForFilm = (idFilm) => {
    this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
  }

  render() {
    console.log('RENDER')
    return (
      <View style={styles.container}>
        <View style={styles.searchbar_container}>
          <FontAwesomeIcon icon={ faSearch } style={styles.search_icon}/>
          <TextInput style={styles.textinput} placeholder="Rechercher un film" placeholderTextColor="#bbc0c4" onChangeText={(text) => this._searchTextInputChanged(text)} onSubmitEditing={() => this._searchFilms()} />
        </View>
        <View style={styles.body_container}>
          <FilmList
            films={this.state.films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
            navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
            loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
            page={this.page}
            totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
            favoriteList={false}
          />
          {this._displayLoading()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchbar_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#fafafa",
    borderRadius: 50
  },
  search_icon: {
    color: '#bbc0c4',
    position: 'absolute',
    left: 10,
  },
  textinput: {
    flex: 1,
    paddingLeft: 25,
    color: '#101010',
  },
  body_container: {
    position: 'relative',
    flex: 1,
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

// export default Search;
export default connect(mapStateToProps)(Search)


