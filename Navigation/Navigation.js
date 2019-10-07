import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'

const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Accueil',
      headerStyle: {
        backgroundColor: '#101010',
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

export default createAppContainer(SearchStackNavigator)