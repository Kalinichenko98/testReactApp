import './LoginPage.css'
import {InputField} from "../../Components/Input/InputField";
import {useFormControl} from "../../Hooks/useFormControl";
import {authenticateUser} from "../../Core/sdk";
import {useState} from "react";
import { useHistory } from "react-router-dom";

export const LoginPage = (props) => {
    let [formError,setFormError] = useState('')
    let history = useHistory();
    console.log(history)
    let {data, handleChange, handleSubmit, errors} = useFormControl({
        initialValues: {email: 'sds@mail.com', password: '1234',},
        onSubmit: ({email,password}) => {
            authenticateUser(email,password).then((response) => response.json())
                .then(v=>{history.push('/main')}).catch(e=>setFormError(e.statusText))

        },
        validation: {
            password: {
                custom: {
                    callback: (value) => value.length > 2,
                    message: 'Минимальная длинна пароля - 3',
                },
            },
            email: {
                custom: {
                    callback: (value) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value),
                    message: 'Это не email',
                },
                required: {
                    value: true,
                    message: 'Обязательное поле',
                },
            },
        }
    })

    return (
        <div className='LoginPage'>
            <h2>Войдите в аккаун</h2>
            <div>
                <form className='Auth__form' onSubmit={handleSubmit}>
                    <InputField
                        name={'email'}
                        type={'input'}
                        placeholder={'Введите email'}
                        value={data.email || ''}
                        handleChange={handleChange('email')}
                        errors={errors.email  || ''}
                    />
                    <InputField
                        name={'password'}
                        type={'password'}
                        placeholder={'Введите пароль'}
                        value={data.password || ''}
                        handleChange={handleChange('password')}
                        errors={errors.password || ''}
                    />
                    <div className='bottom'>
                        <button>Вход</button>
                    </div>
                </form>
                <div style={{textAlign:'center'}}>{formError}</div>
            </div>
        </div>
    );
}