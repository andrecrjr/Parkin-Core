import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from '../Layout/Button';
import UserCarPlate from '../CarList/UserCarPlate';

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
    return(<>
        <section className="one-more-car">
            <p className="list__cars--one-more-car">Adicione mais um veículo!</p>
            <Link to="/user_car"><button className={`add--car`}>+</button></Link>
        </section>
    </>)
}

export const NoCars = () =>{
    return(
        <>
        <p>
            Nenhum carro no momento!
        </p>
        <Link to="/user_car"><Button className={`add--car`}>Adicione o carro</Button></Link>
        </>
    )
}