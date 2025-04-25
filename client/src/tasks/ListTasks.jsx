import { useEffect, useState } from "react"
import Axios from "axios"
import {Link} from "react-router-dom"
import TaskInfo from "./TaskInfo"
import { Dropdown } from 'primereact/dropdown';
import { PanelMenu } from 'primereact/panelmenu';
import { useNavigate } from "react-router-dom";



const ListTask=()=>{
    const [task,setTask]=useState([])
    const [search,setSearch]=useState("")
    const [selectedOrder, setSelectedOrder] = useState("ID");



    const order = [
        { name: 'ID', code: 'ID' },
        { name: 'Title', code: 'TL' },
        { name: 'Complete', code: 'CMP' },
        { name: 'Deadline', code: 'DT' },
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
       

    console.log(selectedOrder)

    const getTasks=async ()=>{
        const {data}=await Axios.get("http://localhost:7002/api/tasks/")
        setTask(data)
    }
    const filteredTasks = task.filter((tsk) =>
        tsk.title.toLowerCase().includes(search.toLowerCase()) ||
        tsk.tags?.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
    )

    useEffect(()=>{
        getTasks()
    },[])
    if(task.length===0)return <h1>Loading...</h1>
    return <div className="mainContainer">
        <PanelMenu model={items} className="menu" />
        <div className="listOfTasks">
            <Link icon='pi pi-upload' className="addBtn" to="/tasks/add">➕ Add a new task</Link>
            <input className="search" placeholder="🔍 search"  onChange={(e)=>{setSearch(e.target.value)}}/>
            <div>  
                <Dropdown placeholder="order by" value={selectedOrder} onChange={(e) => setSelectedOrder(e.value)} options={order} optionLabel="name"/>
            </div>
            {filteredTasks
            .sort((a, b) => {
                if(selectedOrder.name==="Complete")
                    return (a.complete === b.complete) ? 0 : a.complete ? 1 : -1; //זה לא עובד לי!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
                if(selectedOrder.name==="ID")
                    return a._id - b._id
                if(selectedOrder.name==="Deadline")
                    return new Date(a.deadline) - new Date(b.deadline)
                if(selectedOrder.name==="Title")
                    return a.title.localeCompare(b.title)
            })
            .map((task,index)=>{
                return <TaskInfo getTasks={getTasks} task={task}/>})}
        </div>
    </div>
}
export default ListTask