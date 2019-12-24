import {fetchData, apiAuthGet} from '../../helpers/apiService';

const actionType = {
    LIST_CARS_SUCCESS:"LIST_CARS_SUCCESS",
}

const listUserCars = (payload) =>{
    return {
        type:actionType.LIST_CARS_SUCCESS,
        payload:payload
    }
}

export const listCars = (id, token) =>{
    return dispatch => {
        async function fetchCars (){
            try{
                const {data} = await apiAuthGet(`has_cars/${id}`, token)
                dispatch(listUserCars(data))
            }catch(err){
                console.log(err)
            }
        }
        fetchCars()
    }
}