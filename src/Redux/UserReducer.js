
const USER_AUTHORIZES = 'user/USER_AUTHORIZES'
let initialState = {
    isAuth: false,
    token: window.localStorage.token
}

export const User = (state = initialState, action) => {
    switch (action.type) {
        case USER_AUTHORIZES:
            return {...state, isAuth: true}
    }
    return state
}

export const userAuth = (data) => {
    return {
        type: USER_AUTHORIZES,
        payload:{
            data
        }
    }
}