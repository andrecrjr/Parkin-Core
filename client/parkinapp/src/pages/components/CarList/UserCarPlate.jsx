import React from 'react';
import {AddCar} from '../../UserCars'

const UserCarPlate = (props) =>{
    
    const {car} = props
    const {inputCarCode, inputCarModel, registerCar} = React.useContext(AddCar)
    if(registerCar)
        return(
            <section class="user__plate--car">
                <ul>
                    <li class="user__plate--car_code">{inputCarCode.value}</li>
                    <li class="user__plate--model">{inputCarModel.value}</li>
                </ul>
            </section>
        )
   
    return(
        <section class="user__plate--car main-list">
            <ul>
                <li class="user__plate--car_code">{car.car_code}</li>
                <li class="user__plate--model">{car.car_model}</li>
                {registerCar === undefined ? `` : <li class="user__plate--in_parkin">Utilizando Parkin: {car.is_in_parklot === 0? `No`:`Yes`}</li>}
            </ul>
        </section>
    )
}

export default UserCarPlate