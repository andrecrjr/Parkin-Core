import React from 'react';
import {AddCar} from './';
import {apiAuthPost} from '../components/helpers/apiService';
import {UserContext} from '../components/contexts/UserContext';
import {useHistory} from 'react-router-dom';

const AddCarForm = () =>{
    const userAccount = React.useContext(UserContext);
    const {inputCarCode, inputCarModel} = React.useContext(AddCar);
    let history = useHistory()

    const payloadAddCar = {
        car_model:inputCarModel.value,
        car_code:inputCarCode.value,
        owner_id: userAccount.user.id
    }

    const submitAddCar = async (e) =>{
        e.preventDefault()
        try{
            await apiAuthPost('create_car', userAccount.token, payloadAddCar)
            return history.push('/?new_car_added')
        }catch(err){
            console.log(err.response)
        }
    }

    return (
        <>
            <form method="POST" className="form__add-car--group" onSubmit={submitAddCar}>
                <label>Car model</label>
                <input type="text" name="car_model" {...inputCarModel}/>
                <label>Car plate</label>
                <input type="text" name="car_code" {...inputCarCode}/>
                <button type="submit">Adicionar Carro + </button>
            </form>
        </>
    )
}

export default AddCarForm;