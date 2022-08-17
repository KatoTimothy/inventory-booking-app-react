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

    const selectedBookable = bookablesInGroup[bookableIndex]
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
                selectedBookable ? (
                    <div className="item">
                        <div className="item-header">
                            <h2>{selectedBookable.title}</h2>
                            <span className="controls">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked ={hasDetails}
                                        onChange={ () => setHasDetails(has => !has)}/>
                                </label>
                            </span>
                        </div>
                        <p>{selectedBookable.notes}</p>

                        {
                            hasDetails && (
                                <div className="item-details">
                                    <h3>Availability</h3>
                                    <div className="bookable-availability">
                                        <ul>
                                            {selectedBookable.days
                                                .sort()
                                                .map(dayNumber => 
                                                    <li key={dayNumber}>{days[dayNumber]}</li>)}
                                        </ul>
                                        <ul>
                                            {selectedBookable.sessions
                                                .map(sessionNumber => 
                                                    <li key={sessionNumber}>{sessions[sessionNumber]}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    
                ): <div>Oops! You have not selected a bookable yet. Please select one.</div>
            }
        </>
    )
}

export default BookablesList