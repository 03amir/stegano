import {LOG_OUT, SIGN_IN} from './actions'

export function userReducer(state,action){
switch(action.type){
    case SIGN_IN :
        return action.payload
    case LOG_OUT:
        return null
}}

