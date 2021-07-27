import { useState } from "react"

export const useForm = (valuesInitial = {}) => {
    
    const [values, setValues] = useState(valuesInitial);

    const resetear = ()=>{

        setValues(valuesInitial);
    }

    const handleInputChange = ({target}) =>{
        setValues({
            ...values,
            [target.name] : target.value
        })
    }
    return [values, handleInputChange, resetear]
}
