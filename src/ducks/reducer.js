// INITIAL STATE
const initialState = {
    username: '',
    email: '',
    // user_id: 0,
    post: ''
  }
  
  // ACTION CONSTANTS
  const SET_USER = 'SET_USER'
  const LOGOUT_USER = 'LOGOUT_USER'
  const ADD_FLIX = 'ADD_FLIX'
  
  // ACTION BUILDERS
  export function setUser(user) {
    return {
      type: SET_USER,
      payload: user
    }
  }
  export function logoutUser() {
    return {
      type: LOGOUT_USER
    }
  }
  export function addFlix(){
      return {
        type: ADD_FLIX,
      }
  }
  
  // REDUCER
  export default (state=initialState, action) => {
    const {type, payload} = action
    switch (type) {
      case LOGOUT_USER:
        return initialState
      case SET_USER: 
        const {username, email} = payload
        return {...state, username, email}
      case ADD_FLIX:
          const{flix_title,flix_image, flix_content} = payload
          return{...state, flix_title,flix_image, flix_content }
      default: return state
    }
  }