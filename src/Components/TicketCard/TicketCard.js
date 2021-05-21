import './TicketCard.css'
import React from "react";
import {Card} from "antd";
import {string} from "prop-types";
export const TicketCard = React.memo(({name,date})=> {
    return (
        <Card title="Card title" bordered={false} style={{ width: 400,marginLeft:20 }}>
            <div className="site-card-border-less-wrapper">
            <div className='card'>
                    название компании: {name}
                <br/>
                    Дата Вылета: {date}
            </div>
            </div>
        </Card>
    );
})

TicketCard.propTypes  ={
    name: string,
    date: string,
}