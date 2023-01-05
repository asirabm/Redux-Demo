import axios from "axios";
import { createStore } from "redux";
import { applyMiddleware } from "redux";
import thunk from 'redux-thunk';
/*import pkg from 'redux-thunk';
const { ThunkMiddleware } = pkg;*/
//state
const initialState={
    loading:false,
    user:[],
    error:""
}
//action
const FETCH_USER_REQUEST='FETCH_USER_REQUEST'
const FETCH_USER_SUCESS='FETCH_USER_SUCESS'
const FETCH_USER_FAILIURE='FETCH_USER_FAILIURE'
const fetch_user_request=()=>{
    return {
        type:FETCH_USER_REQUEST
    }
}
const fetch_user_sucess=(user)=>{
    return {
        type:FETCH_USER_SUCESS,
        payload:user
    }
}
const fetch_user_failiure=(err)=>{
    return {
        type:FETCH_USER_FAILIURE,
        error:err
    }
}
const reducer=(state=initialState,action)=>{
 switch(action.type){
    case FETCH_USER_REQUEST :
        return {
            ...state,
            loading:true
        }
    case FETCH_USER_SUCESS :
        return{
            loading:false,
            user:[...action.payload],
            error:''
        }
    case FETCH_USER_FAILIURE :
        return{
            loading:false,
            user:[],
            error:action.error
            }
 } 
}
function getUser(){
  return async (dispatch)=>{
     dispatch(fetch_user_request())
     try{
        //console.log('hjgjh')
        const a=await axios.get('https://jsonplaceholder.typicode.com/users')
       /* axios.get('https://jsonplaceholder.typicode.com/users').then(res=>{
           const user=res.data.map(user=>user.id)
           dispatch(fetch_user_sucess(user))
        }).catch()*/
        const users=a.data.map(user=>user.id)
        dispatch(fetch_user_sucess(users))
    }
    catch(e){
       // console.log(e)
        dispatch(fetch_user_failiure(e.message))
    }
  }
}
const store=createStore(reducer,applyMiddleware(thunk.default))
store.subscribe(()=>console.log(store.getState()))
store.dispatch(getUser())
