const initialState = {cars:[]}

export const listCars = (state=initialState, action)=>{
    switch(action.type){
        case "LIST_CARS_SUCCESS":
            return {...state, cars:[...state.cars,...action.payload]}
        
        default:
            return state;
    }
}