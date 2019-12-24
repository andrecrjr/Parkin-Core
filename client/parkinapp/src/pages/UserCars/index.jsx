import React from 'react';
import AddCarForm from './AddCarForm'
import UserCarPlate from '../../components/CarList/UserCarPlate';
import {useFormInput} from '../../components/hooks/useFormInput';

export const AddCar = React.createContext({});

const RegisterCar = () =>{
    let registerCar = true;
    const inputCarCode = useFormInput("");
    const inputCarModel = useFormInput("");
    return (
        <>
        <AddCar.Provider value={{inputCarCode, inputCarModel, registerCar}}>
            <h2>Add your car</h2>
                <AddCarForm/>
                <UserCarPlate/>
        </AddCar.Provider>
        </>
    )
}

export default RegisterCar;