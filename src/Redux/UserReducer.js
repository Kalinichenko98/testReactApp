
const USER_AUTHORIZES = 'user/USER_AUTHORIZES'
const GET_TICKETS = 'user/GET_TICKETS'
const LOG_OUT = 'user/LOG_OUT'
let initialState = {
    isAuth: false,
    token: window.localStorage.token,
    email: null,
    tickets: []
}

export const User = (state = initialState, action) => {
    switch (action.type) {
        case USER_AUTHORIZES:
            return {...state, isAuth: true,email:action.payload.email}
        case GET_TICKETS:
            return {...state, tickets: {...state.tickets,...action.payload.tickets}}
        case LOG_OUT:
            return {...state, isAuth: false, email: null, tickets: []}
    }
    return state
}

export const userAuth = (data) => {
    return {
        type: USER_AUTHORIZES,
        payload:data
    }
}

export const logOut = () => {
    return {
        type: LOG_OUT,
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