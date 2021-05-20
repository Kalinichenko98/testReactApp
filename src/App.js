import {LoginPage} from "./Pages/LoginPage/LoginPage";
import {useSelector} from "react-redux";
import  {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import {MainPage} from "./Pages/MainPage/MainPage";
import {useEffect} from "react";
import {validateToken} from "./Core/sdk";

const App = (props)=> {
    let token = useSelector((state)=>state.user.token)
    let isAuth = useSelector((state)=>state.user.isAuth)
    let history = useHistory()
    useEffect(()=>{
        if (token) {
            validateToken(token).then(v=>{
                if (v) history.push('/main')
                else history.push('/login')
                })
        }
        },[])
  return (
    <div>
        <Switch>
            <Route exact path={['/login']} component={LoginPage}/>
            <Route exact path={['/main','/']} component={MainPage}/>
        </Switch>
        {isAuth ? <Redirect to={'/main'}/> :  <Redirect to={'/login'}/> }
    </div>
  );
}

export default App;
