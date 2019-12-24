import React from 'react';
import {useParams} from 'react-router-dom'


const Profile = (props) =>{
    let params = useParams()
    
    return (
        <section>
            <div>
                Usuario: {params.id}
            </div>
        </section>
    )
}

export default Profile;