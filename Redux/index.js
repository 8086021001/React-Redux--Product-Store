const redux = require('redux')
const createStore = redux.createStore
const combineReducer = redux.combineReducers

//action defined

const Buy_now = "Buy_now"
//action creators
function buy(){
    return(
        {
            type:Buy_now,
            info:"I am going to buy"
        }
    )
}

const initialState1 = {
    quantityAvail: 10
}
const initialState2 = {
    quantityAvail: 20
}


//reducer fucntion accepting prev state and action as arg
const reducer1 = (state = initialState1,action)=>{
    switch (action.type) {
        case Buy_now: return{
            ...state,
            quantityAvail:state.quantityAvail - 1
            
        }
        default: return state
    }
}


const reducer2 = (state = initialState2,action)=>{
    switch (action.type) {
        case Buy_now: return{
            ...state,
            quantityAvail:state.quantityAvail - 2
            
        }
        default: return state
    }
}

//creating store
//the store has initial state of application in reducer function arg

// if there are multiple reducers we need combinereducer
const rootReducer = combineReducer({
    one:reducer1,
    two:reducer2
})

const store = createStore(rootReducer)
console.log('initial state is', store.getState())
const unsubscribe = store.subscribe(()=>{console.log('Updated state',store.getState())})
store.dispatch(buy())
store.dispatch(buy())
store.dispatch(buy())
unsubscribe()