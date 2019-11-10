import React from 'react';
import {Link} from 'react-router-dom'


export const CarList = ({cars}) =>{
    return(
        <>
        {
            cars.map((car, index)=>
                <ul class="list__cars--car" key={index}>
                    <li class="list__cars--car_code">{car.car_code}</li>
                    <li class="list__cars--model">{car.car_model}</li>
                    <li class="list__cars--in_parkin">Utilizando Parkin: {car.is_in_parklot === 0? `No`:`Yes`}</li>
                </ul>
            )
        }
        </>
    )
}

export const NoCars = () =>{
    return(
        <p>
            Nenhum carro no momento! <Link to="/user_car">Cadastre um agora</Link>!
        </p>
    )
}