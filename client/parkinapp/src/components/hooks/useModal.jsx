import React from 'react';

export const useModal = (button=false) =>{
    const [modal, activateModal] = React.useState(false)

        const formModal = (e) =>{
            e.preventDefault()
            activateModal(!modal)
        }

        const onMouseOver = (e) =>{
            formModal(e)
        }
    
        const onMouseOut = (e) =>{
            formModal(e)
        }

    return {modal, formGet:{onMouseOver, onMouseOut}}

}