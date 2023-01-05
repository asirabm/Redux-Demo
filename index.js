import { createStore } from "redux"

const BUY_CAKE='BUY_CAKE'
const BUY_ICE='BUY_ICE'

function buyCake(){
    return {
        type:BUY_CAKE,
        info:'first redux action'
    }
}
function buyIceCream(){
  return {
      type:BUY_ICE,
      info:'first redux action'
  }
}

const initialState={
    numOfCake:10,
    numOfIceCream:20
}
const reducer=(state=initialState,action)=>{
  switch(action.type){
    case BUY_CAKE: return {
        ...state,
        numOfCake:state.numOfCake-1
    }
    case BUY_ICE: return {
      ...state,
      numOfIceCream:state.numOfIceCream-1
  }
    default: return state
  }
}







const store=createStore(reducer)
console.log(store.getState())
store.subscribe(()=>console.log(store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())

