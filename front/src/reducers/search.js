import { DISPLAY_SEARCH } from '../actions/search'

const initialState = {
  search: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_SEARCH:
      return {
        ...state,
        search: (state.search = [...state.search, action.payload])
      }

    default:
      return state
  }
}
