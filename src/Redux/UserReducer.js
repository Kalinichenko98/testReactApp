
const USER_AUTHORIZES = 'user/USER_AUTHORIZES'
const GET_TICKETS = 'user/GET_TICKETS'
let initialState = {
    isAuth: false,
    token: window.localStorage.token,
    email: null,
    tickets: []
}

export const User = (state = initialState, action) => {
    switch (action.type) {
        case USER_AUTHORIZES:
            return {...state, isAuth: true,email:action.payload.email,token: action.payload.token}
        case GET_TICKETS:
            return {...state, tickets: {...state.tickets,...action.payload.tickets}}
    }
    return state
}

export const userAuth = (data) => {
    return {
        type: USER_AUTHORIZES,
        payload:data
    }
}

export const getTickets = (tickets) => {
    return {
        type: GET_TICKETS,
        payload:{
            tickets
        }
    }
}