import React from 'react';


export const CarList = ({cars}) =>{
    return(
        <>
        {
        cars.map((car, index)=>
            <ul class="list__cars--car">
                <li class="list__cars--car_code">{car.car_code}</li>
                <li class="list__cars--model">{car.car_model}</li>
                <li class="list__cars--in_parkin">Utilizando Parkin: {car.is_in_parklot === 0? `No`:`Yes`}</li>
            </ul>
        )}
        </>
    )
}

export const NoCars = () =>{
    return(
        <p>
            Nenhum carro no momento! Cadastre um agora!
        </p>
    )
}