
import {useDispatch, useSelector} from "react-redux";
import  {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import {useEffect} from "react";
import {getUser, validateToken} from "./Core/sdk";
import MainPage from "./Pages/MainPage/MainPage";
import {LoginPage} from "./Pages/LoginPage/LoginPage";
import {userAuth} from "./Redux/UserReducer";
import 'antd/dist/antd.css';

const App = ()=> {
    let token = useSelector((state)=>state.user.token)
    let isAuth = useSelector((state)=>state.user.isAuth)
    let history = useHistory()
    let dispatch = useDispatch()
    useEffect(()=>{
        isAuth? history.push('/main') : history.push('/login')
    },[isAuth])
    useEffect(()=>{
        if (token) {
            validateToken(token).then(v=>{
                if (v) {
                    getUser(token).then(data=>{
                        dispatch(userAuth(data))
                        history.push('/main')
                    })
                }
                else history.push('/login')
                })
        }
        },[])
  return (
    <div>
        <Switch>
            <Route exact path={['/login']} component={LoginPage}/>
            <Route exact path={['/main','/']} render={()=><MainPage isAuth={isAuth}/>}/>
        </Switch>
    </div>
  );
}

export default App;
