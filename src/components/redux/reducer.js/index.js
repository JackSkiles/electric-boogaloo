import { MOVIE_TITLE} from '../actions/sceneItActions'

const initialState = {
    saved: []
}

function reducer(state = initialState, action){
    switch(action.type) {
        case MOVIE_TITLE:
            return {
                url: 'https://www.omdbapi.com/?apikey=b43843a0&s=' + action.value
            }
            
        default:
            return state;
    }
}

export default reducer;