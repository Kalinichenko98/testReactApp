import {useState} from "react";

export const useFormControl = (options)=>{
    let [data, setData] = useState(options?.initialValues || {})
    let [errors, setErrors] = useState({})
    let handleChange = (fieldName, type = 'input') => (e) => {
        switch (type) {
            case 'checkbox':
                setData({...data, [fieldName]: e.target.checked})
                break
            default:
                setData({...data, [fieldName]: e.target.value})
        }
        setErrors({})
    }
    let handleSubmit = (e) => {
        e.preventDefault()
        let validators = options?.validation
        if (validators) {
            const newErrors = {};
            let isValid = true
            for (const key in validators) {
                const value = data[key];
                const validation = validators[key]
                if (validation?.custom?.callback && !validation?.custom?.callback(value)) {
                    isValid = false;
                    newErrors[key] = validation?.custom?.message;
                }
                if (validation?.required?.value && !value) {
                    isValid = false;
                    newErrors[key] = validation?.required?.message;
                }
            }
            if (!isValid) {
                setErrors(newErrors);
                return;
            }
        }
        setErrors({});
        if (options?.onSubmit) options.onSubmit(data)
    }
    return {
        data,
        handleChange,
        handleSubmit,
        errors
    }
}