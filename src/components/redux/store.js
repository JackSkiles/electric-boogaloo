import { createStore } from 'redux'
import reducer from './reducer.js/index.js'

const store = createStore(reducer);

export default store;