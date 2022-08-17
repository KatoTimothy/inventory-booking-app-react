import data from '../../static.json'

const {users} = data

const UserPicker = ()=>
    <select>
        {users.map(({name, id}) => <option  key={id}>{name}</option>)}
    </select>

export default UserPicker