import './LoginPage.css'
import {InputField} from "../../Components/Input/InputField";
import {Button} from "antd";
export const LoginPage = (props)=> {
    return (
        <div className='LoginPage'>
            <h2>Войдите в аккаун</h2>
            <div>
                <form className='Auth__form'>
                    <InputField
                        type={'email'}
                        placeholder={'Введите email'}/>
                    <InputField
                        type={'email'}
                        placeholder={'Введите пароль'}
                    />
                    <div className='bottom'>
                        <Button>Вход</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}