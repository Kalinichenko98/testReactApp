import {Input} from "antd";
import './InputField.css'
export const InputField = ({placeholder,type,value,errors,handleChange})=> {
    return (
        <div className='input'>
            <Input placeholder={placeholder} type={type} value={value} onChange={handleChange}/>
        </div>
    );
}
