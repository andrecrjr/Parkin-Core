import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from '../Layout/Button';
import UserCarPlate from './UserCarPlate';
import {useModal} from '../hooks/useModal';

export const CarList = ({cars}) =>{
    
    return(
        <>
        {
            cars.map((car, index)=>
                <UserCarPlate key={index} car={car}/>
            )
        }
        </>
    )
}

export const OneMoreCar = () =>{
    const addCarButton = useModal()
    return(<>
        <section className="one-more-car">
            <p className={addCarButton.modal ?`list__cars--one-more-car`:`list__cars--one-more-car none`}>Add a new car</p>
            <Link to="/user_car"><button className={`add--car`} onMouseEnter={()=>{console.log("passou aqui")}}>+</button></Link>
        </section>
    </>)
}

export const NoCars = () =>{
    return(
        <>
        <p>
            Nenhum carro no momento!
        </p>
            <OneMoreCar/>
        </>
    )
}