import React from 'react';
import {UserContext} from '../components/contexts/UserContext';
import {CarList, NoCars, OneMoreCar} from '../components/CarList/';
import {apiAuthGet} from '../components/helpers/apiService';
import MapUser from './MapIndex';
import {useModal} from '../components/hooks/useModal';

const Main = () =>{
    const userData = React.useContext(UserContext)
    const [cars, setCars] = React.useState([])
    

    const loadCars = React.useCallback(async (id) =>{
        try{
            const {data} = await apiAuthGet("has_cars/"+id, userData.token)
            setCars(data);
        }catch(err){
            console.log(err)
        }
    }, [userData.token])
    
    React.useEffect(()=>{
       if(userData.user.id){
           loadCars(userData.user.id)
       }
    },[loadCars, userData.user.id])

    if(userData.token){
        if(cars.length > 0){
            return(
                <>
                <section className="car__list--wrapper">
                    <CarList cars={cars} />
                </section>
                    <OneMoreCar/>
                </>
            )
        }else{
            return(
            <>
                <NoCars/>   
            </>
            )
        }
    }

    return(
        <h1>Welcome to Parkin, your solutions to find Park Lots!</h1>
    )
}

export default Main;