import './MainPage.css'
import {useDispatch, useSelector} from "react-redux";
import Layout, {Content, Header} from "antd/es/layout/layout";
import {useEffect, useMemo} from "react";
import {getFlights} from "../../Core/sdk";
import {getTickets, logOut} from "../../Redux/UserReducer";
import {Button, Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {useFilter} from "../../Hooks/useFilter";
import {TicketCard} from "../../Components/TicketCard/TicketCard";
import {bool, string} from "prop-types";
import {parse} from "date-fns";


const MainPage = ({isAuth}) => {
    let email = useSelector((state => state.user.email))
    //    TODO reselect
    let tickets = useSelector((state => state.user.tickets))
    let token = useSelector((state => state.user.token))
    let sorted = useMemo(() => {
        return Object.values(tickets).sort((a, b) => {
            let aDate = parse(a.date, 'dd-MM-yyyy', new Date())
            let bDate = parse(b.date, 'dd-MM-yyyy', new Date())
            return aDate.getTime() - bDate.getTime()
        })
    }, [tickets])
    let dispatch = useDispatch()
    useEffect(() => {
        let getData = async () => {
            let response = await getFlights(localStorage.token || token)
            let data = await response.json()
            dispatch(getTickets(data.data))
        }
        if (localStorage.token || token) getData()
    }, [isAuth,token])
    let {sortedTickets,handleChange,value} = useFilter(sorted)
    let handleLogOut = ()=>{
        try {
            localStorage.token = ''
            dispatch(logOut())
        }
        catch (e){
            dispatch(logOut())
        }
    }
    return (
        <div>
            <Layout>
                <Header className='header__main'>
                    <span>{email}</span>
                    <Button onClick={handleLogOut} type={'primary'}>Выход</Button>
                </Header>
                <Content className='content'>
                   <div className="search">
                       поиск билетов:
                       <br/>
                       <Input value={value} onChange={handleChange} addonAfter={<SearchOutlined/>} placeholder="Поиск среди контактов" allowClear style={{width:600}}/>
                   </div>
                    <div className="cardLit">
                        {sortedTickets.map((e)=><TicketCard date={e.date} name={e.company.name} key={e.company.name}/>)}
                    </div>
                </Content>
            </Layout>
        </div>
    )
}

MainPage.propTypes = {
    isAuth:bool
}

export default MainPage