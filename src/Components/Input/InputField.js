import {Input} from "antd";
import './InputField.css'
import React from "react";
import {func, string} from "prop-types";
export const InputField = React.memo(({placeholder,type,value,errors,handleChange})=> {
    return (
        <div className='input'>
            <Input placeholder={placeholder} type={type} value={value} onChange={handleChange}/>
            <div className="error">{errors}</div>
        </div>
    );
})

InputField.propTypes  ={
    placeholder: string,
    type: string,
    value: string,
    errors: string,
    handleChange:func
}
