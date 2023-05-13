const { default: axios } = require('axios')
const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default

const initialState = {
    loading:false,
    users:[],
    error:''
}

//action 

const FETCH_DATA = "FETCH_DATA"
const FETCH_SUCCESS = "FETCH_SUCCESS"
const FETCH_FAILURE  ="FETCH_FAILURE"

//action creator

const fetchreq = ()=>{
    return{
        type:FETCH_DATA
    }
}

const fetchsuc = (users)=>{
    return{
        type:FETCH_SUCCESS,
        payload:users
    }
}

const fetchfail = (error)=>{
    return{
        type:FETCH_FAILURE,
        payload:error
    }
}

//reducer

const reducer = (state=initialState,action)=>{
    switch (action.type) {
        case FETCH_DATA:
            return{
                ...state,
                loading:true
            }
        case FETCH_SUCCESS:
            return{
                loading:false,
                users:action.payload,
                error:""
                }
        case FETCH_FAILURE:
            return{
                loading:false,
                users:[],
                error:action.payload
            }
            
            
    
        default:
            return state;
    }
}


const fetchUser = () => {
    return async function(dispatch) {
        try {
            dispatch(fetchreq());
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            const users = response.data.map((user) => user.username);
            dispatch(fetchsuc(users));
        } catch (error) {
            dispatch(fetchfail(error.message));
        }
    };
};

//in store we can alse apply middlewares using applyMidlewares from redux
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(fetchUser());

