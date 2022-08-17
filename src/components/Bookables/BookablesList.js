import { useState } from "react"
import data from "../../static.json"
import {FaArrowRight} from 'react-icons/fa'

const {bookables, sessions, days} = data

const BookablesList =()=> {
    const [bookableIndex, setBookableIndex] = useState(1)
    const [group, setGroup] = useState("Kit") 

    //unique collection of bookable group names
    const groups = [...new Set(bookables.map(b => b.group))]

    //collection of bookables in selected group
    const bookablesInGroup = bookables.filter(bookable => bookable.group === group)

    const bookableItem = bookablesInGroup[bookableIndex]
    const [hasDetails, setHasDetails] = useState(false)


    return (
        <>
            <div>
                <select
                    name="group"
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}>
                    {groups.map(group =>
                        <option
                            key={group}
                            value={group}>
                                {group}
                            </option>)}
                </select>
                <ul className="bookables items-list-nav">
                    {bookablesInGroup.map((bookableItem, index) => (
                        <li
                            key={bookableItem.id}
                            className={(index === bookableIndex) ? "selected": null}>
                            <button
                                className = "btn"
                                onClick = {() => setBookableIndex(index)}>
                                {bookableItem.title}
                            </button>
                        </li>
                    ))}
                </ul>
                <p>
                    <button
                        className="btn"
                        onClick={() => setBookableIndex(index => (index + 1)% bookablesInGroup.length)}
                        autoFocus
                    >
                        <FaArrowRight/>
                        <span>Next</span>
                    </button>
                </p>
            </div>
            {
                bookableItem && (
                    <div className="item">
                        <div className="item-header">
                            <h2>{bookableItem.title}</h2>
                            <span className="controls">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked ={hasDetails}
                                        onChange={ () => setHasDetails(has => !has)}/>
                                </label>
                            </span>
                        </div>
                        <p>{bookableItem.notes}</p>

                        {
                            hasDetails && (
                                <div className="item-details">
                                    <h3>Availability</h3>
                                    <div className="bookable-availability">
                                        <ul>
                                            {bookableItem.days
                                                .sort()
                                                .map(dayIndex => 
                                                    <li key={dayIndex}>{days[dayIndex]}</li>)}
                                        </ul>
                                        <ul>
                                            {bookableItem.sessions
                                                .map(sessionIndex => 
                                                    <li>{sessions[sessionIndex]}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    
                )
            }
        </>
    )
}

export default BookablesList