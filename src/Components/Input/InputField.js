import {Input} from "antd";
import './InputField.css'
import React from "react";
export const InputField = React.memo(({placeholder,type,value,errors,handleChange,name})=> {
    return (
        <div className='input'>
            <Input placeholder={placeholder} type={type} value={value} onChange={handleChange}/>
            <div className="error">{errors}</div>
        </div>
    );
})
