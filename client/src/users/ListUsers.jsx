import { useEffect, useState } from "react"
import Axios from "axios"
import {Link} from "react-router-dom"
import UserInfo from "./UserInfo"
import { Dropdown } from 'primereact/dropdown';
import { PanelMenu } from 'primereact/panelmenu';
import { useNavigate } from "react-router-dom";

const ListUsers=()=>{
    const [users,setUser]=useState([])
    const [search,setSearch]=useState("")
    const [selectedOrder, setSelectedOrder] = useState("ID");

    const order = [
        { name: 'ID', code: 'ID' },
        { name: 'Name', code: 'NM' },
        { name: 'User Name', code: 'UN' }

    ];

    const navigate = useNavigate();
    const items = [     
            { label: 'Tasks', icon: 'pi pi pi-list-check',
                    items:[{label: 'View Tasks',icon: 'pi pi pi-list-check',command:()=>navigate("/tasks/")},
                           {label: 'Add Task',icon: 'pi pi-plus',command:()=>navigate("/tasks/add")}]},
            { label: 'Posts',icon: 'pi pi-book',
                    items: [{label: 'View Post',icon: 'pi pi-book',command:()=>navigate("/posts/")},
                            { label: 'Add Post',icon: 'pi pi-plus',command:()=>navigate("/posts/add")}]},
            { label: 'Users',icon: 'pi pi-user',
                    items: [{label: 'View Users',icon: 'pi pi-user',command:()=>navigate("/users/")},
                            {label: 'Add User',icon: 'pi pi-plus',command:()=>navigate("/users/add")}]}]
       

    const filteredUsers = users.filter((usr) =>
        usr.name.toLowerCase().includes(search.toLowerCase())||
        usr.username.toLowerCase().includes(search.toLowerCase())
    )

    const getUsers=async ()=>{
        const {data}=await Axios.get("http://localhost:7002/api/users/")
        setUser(data)
    }
    useEffect(()=>{
        getUsers()
    },[])
    if(users.length===0) return <h1>Loading...</h1>
    return <div className="mainContainer">
        <PanelMenu model={items} className="menu" />
        <div className="listOfUsers">
        <Link icon='pi pi-upload' className="addBtn" to="/users/add">➕ Add a new user</Link>
        <input className="search" placeholder="🔍 search"  onChange={(e)=>{setSearch(e.target.value)}}/>
            <div>  
                <Dropdown placeholder="order by" value={selectedOrder} onChange={(e) => setSelectedOrder(e.value)} options={order} optionLabel="name"/>
            </div>
            {filteredUsers
            .sort((a, b) => {
                if(selectedOrder.name==="ID")
                    return a._id > b._id ? 1 : -1
                if(selectedOrder.name==="Name")
                    return a.name.localeCompare(b.name)
                if(selectedOrder.name==="User Name")
                    return a.username.localeCompare(b.username);
            })
            .map((user,index)=>{
                return <UserInfo getUsers={getUsers} user={user}/>
            })}
        </div>
    </div>
}
export default ListUsers