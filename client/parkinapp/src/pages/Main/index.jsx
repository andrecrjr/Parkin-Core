import React from 'react';
import {UserContext, TokenContext} from '../components/contexts/UserContext';
import {apiAuthGet} from '../components/helpers/apiService';

export const Main = (props) =>{
    const data = React.useContext(UserContext)
    const {token} = React.useContext(TokenContext)
    const [cars, setCars] = React.useState([])
    
    const loadCars = React.useCallback(async (id) =>{
        try{
            const {data} = await apiAuthGet("has_cars/"+id, token)
            setCars(data);
        }catch(err){
            console.log(err)
        }
    }, [token])
    
    React.useEffect(()=>{
       if(data.user.id){
           loadCars(data.user.id)
       }
    },[loadCars, data.user.id])

    if(token){
        console.log(cars)
        return(
            <>
                {cars.map((ctx, index)=>
                    <ul key={index}>
                        <li>{ctx.car_code}</li>
                        <li>{ctx.car_model}</li>
                        <li>Está em um parkin? {ctx.is_in_parklot === 0 ? `Não` : `Sim`}</li>
                    </ul>
                )}
            </>
        )
    }

    return(
        <h1>Welcome to Parkin, your solutions to find Park Lots!</h1>
    )
}