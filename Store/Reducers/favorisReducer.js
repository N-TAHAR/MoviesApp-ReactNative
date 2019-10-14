
const initialState = { favorisFilm: [] }

function toggleFavoris(state = initialState, action){
  let nextState
  switch (action.type) {
    case 'TOGGLE_FAVORIS' :
      const favorisFilmIndex = state.favorisFilm.findIndex(item => item.id === action.value.id)
      console.log(favorisFilmIndex)
      if (favorisFilmIndex !== -1) {
        nextState = {
          ...state,
          favorisFilm: state.favorisFilm.filter((item, index) => index !== favorisFilmIndex)
        } 
      } else {
        nextState = {
          ...state,
          favorisFilm: [...state.favorisFilm, action.value]
        }
      }
      return nextState || state
  default:
    return state
  }
}

export default toggleFavoris