import {useState} from "react";

export const useFilter = (tickets) => {
    let [value, setValue] = useState('')
    let handleChange = (e) => {
        setValue(e.target.value)
    }
    let sortedTickets = tickets.filter(e => e.company.name.includes(value))
    if (!sortedTickets.length) {
        sortedTickets = tickets.filter(e => e.company.alternativeNames.includes(value))
    }
    return {
        value, sortedTickets, handleChange
    }
}