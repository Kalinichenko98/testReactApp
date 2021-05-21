import './MainPage.css'
import {useDispatch, useSelector} from "react-redux";
import Layout, {Content, Header} from "antd/es/layout/layout";
import {useEffect, useMemo} from "react";
import {getFlights} from "../../Core/sdk";
import {getTickets} from "../../Redux/UserReducer";
import {Button, Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {useFilter} from "../../Hooks/useFilter";
import {TicketCard} from "../../Components/TicketCard/TicketCard";
import {string} from "prop-types";
import {parse} from "date-fns";


const MainPage = ({token}) => {
    let email = useSelector((state => state.user.email))
    //    TODO reselect
    let tickets = useSelector((state => state.user.tickets))
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
            let response = await getFlights(token)
            let data = await response.json()
            dispatch(getTickets(data.data))
        }
        if (token) getData()
    }, [token])
    let {sortedTickets,handleChange,value} = useFilter(sorted)
    return (
        <div>
            <Layout>
                <Header className='header__main'>
                    <span>{email}</span>
                    <Button type={'primary'}>Выход</Button>
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
    token:string
}

export default MainPage