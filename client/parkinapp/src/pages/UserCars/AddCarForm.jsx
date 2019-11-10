import React from 'react';
import {AddCar} from './';

const AddCarForm = () =>{
    const {inputCarCode, inputCarModel} = React.useContext(AddCar);
    return (
        <>
        <form method="POST" className="form__add-car--group">
            <label>Car model</label>
            <input type="text" name="car_model" {...inputCarCode}/>
            <label>Car plate</label>
            <input type="text" name="car_code" {...inputCarModel}/>
        </form>
        </>
    )
}

export default AddCarForm;