import React from 'react';
import {AddCar} from './';
import {apiAuthPost} from '../../helpers/apiService';
import {UserContext} from '../../components/contexts/UserContext';
import {useHistory} from 'react-router-dom';
import {useModal} from '../../components/hooks/useModal';

const AddCarForm = () =>{
    const userAccount = React.useContext(UserContext);
    const {inputCarCode, inputCarModel} = React.useContext(AddCar);
    const carModel = useModal();
    const carPlate = useModal();

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
                <span class={carModel.modal?`form__modal on`:`form__modal off`}>Type here the name of your car for Parkins recognize you!</span>
                <input type="text" name="car_model" {...inputCarModel} 
                                    placeholder="Ford Ka" 
                                    {...carModel.formGet}/>
                <label>Car plate</label>
                <span class={carPlate.modal?`form__modal on`:`form__modal off`}>This will be important, 
                your plate is just yours and unique in our database!</span>
                <input type="text" name="car_code" {...inputCarCode} {...carPlate.formGet} placeholder="KLL-9864"/>
                <button type="submit">Add Car + </button>
            </form>
        </>
    )
}

export default AddCarForm;