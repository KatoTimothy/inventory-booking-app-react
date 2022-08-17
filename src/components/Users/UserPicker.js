import data from '../../static.json'

const {users} = data

const UserPicker = ()=>
    <select>
        {users.map(({name}) => <option>{name}</option>)}
    </select>

export default UserPicker