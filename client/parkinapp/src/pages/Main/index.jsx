import React from 'react';
import {CarList, NoCars, OneMoreCar} from '../../components/CarList';
import MapUser from './MapIndex';
import {useModal} from '../../components/hooks/useModal';
import { useSelector, useDispatch } from 'react-redux';
import {listCars} from '../../actions/authUser/listCars'

const Main = () =>{
    const {auth, userCars} = useSelector(state=>state);
    const {cars} = userCars;
    const {user} = auth;
    const dispatchListCars = useDispatch();

    React.useEffect(()=>{
       if(auth.authenticated){
           async function loadCars(){
            try{
                dispatchListCars(listCars(user.id,auth.token))
            }catch(err){
                console.log(err)
            }
           }
           loadCars()
       }
       
    },[auth, user])

    if(auth.authenticated){
        return (<ListCarsMain cars={cars}/>)
    }

    return(
        <h1>Welcome to Parkin, your solutions to find Park Lots!</h1>
    )
}

export default Main;

export const ListCarsMain = ({cars}) =>{
    if(cars){
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
