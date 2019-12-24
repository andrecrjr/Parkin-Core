import React from 'react';
import {UserContext} from '../../components/contexts/UserContext';
import {CarList, NoCars, OneMoreCar} from '../../components/CarList';
import {apiAuthGet} from '../../helpers/apiService';
import MapUser from './MapIndex';
import {useModal} from '../../components/hooks/useModal';
import { useSelector } from 'react-redux';

const Main = () =>{
    const {user} = React.useContext(UserContext)
    //const data = useSelector(state=>state)
    const [cars, setCars] = React.useState([])

    React.useEffect(()=>{
       if(user.id){
           async function loadCars(id){
            try{
                const {data} = await apiAuthGet("has_cars/"+id, user.token)
                setCars(data);
            }catch(err){
                console.log(err)
            }
           }
           loadCars(user.id)
       }
       console.log(user)
    },[user.id])

    if(user.token){
        if(cars.length > 0){
            return(
                <>
                <section className="car__list--wrapper">
                    <h1>Selecione {cars.length > 1 ? `um de seus carros cadastrados!`: `seu carro cadastrado!`} </h1>
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