import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favoris from '../Components/Favoris'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart, faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Rechercher',
      // headerBackTitle : null,
      // headerTitleStyle: { width : Dimensions.get('window').width },
      headerStyle: {
        fontFamily: 'Roboto-Bold',
        backgroundColor: '#050505',
      },
      headerTintColor: 'gold',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  },
  FilmDetail: { 
    screen: FilmDetail,
    navigationOptions: {
      title: 'Détail du film',
      headerStyle: {
        backgroundColor: '#050505',
      },
      headerTintColor: 'gold',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  },
})

const FavorisStackNavigator = createStackNavigator({
  Favoris: {
    screen: Favoris,
    navigationOptions: {
      title: 'Favoris',
      headerStyle: {
        backgroundColor: '#050505',
      },
      headerTintColor: 'gold',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  },
  FilmDetail: { 
    screen: FilmDetail,
    navigationOptions: {
      title: 'Détail du film',
      headerStyle: {
        backgroundColor: '#050505',
      },
      headerTintColor: 'gold',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  },
})

const MoviesTabNavigator = createBottomTabNavigator({
  Rechercher: {
    screen: SearchStackNavigator,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => {
        return <FontAwesomeIcon icon={ faSearch } color={ tintColor } size={ 20 } />
      }
    }
  },
  Favoris: {
    screen: FavorisStackNavigator,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => {
        return <FontAwesomeIcon icon={ faHeart } color={ tintColor } size={ 20 } />
      }
    }
  }
}, {
  tabBarOptions: {
    showLabel: true,
    showIcon: true,
    activeBackgroundColor: 'gold',
    inactiveBackgroundColor: '#050505',
    activeTintColor: '#fafafa',
    inactiveTintColor: 'gold',
  }
})

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

export default createAppContainer(MoviesTabNavigator)