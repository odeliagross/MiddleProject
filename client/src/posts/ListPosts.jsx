import { useEffect, useState } from "react"
import Axios from "axios"
import {Link} from "react-router-dom"
import PostInfo from "./PostInfo"
import { Dropdown } from 'primereact/dropdown';
import { PanelMenu } from 'primereact/panelmenu';
import { useNavigate } from "react-router-dom";




const ListPosts=()=>{
    const [post,setPost]=useState([])
    const [search,setSearch]=useState("")
    const [selectedOrder, setSelectedOrder] = useState("ID");

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
         


    const order = [
        { name: 'ID', code: 'ID' },
        { name: 'Title', code: 'TL' },
        { name: 'Text', code: 'TXT' }
    ];

    console.log(selectedOrder)

    const getPosts=async ()=>{
        const {data}=await Axios.get("http://localhost:7002/api/posts/")
        setPost(data)
    }
    const filteredPosts = post.filter((pst) =>
        pst.title.toLowerCase().includes(search.toLowerCase())
    )

    useEffect(()=>{
        getPosts()
    },[])

    if(post.length===0)return <h1>Loading...</h1>
    return <div className="mainContainer">
        <PanelMenu model={items} className="menu" />
        <div className="listOfPosts">
        <Link icon='pi pi-upload' className="addBtn" to="/posts/add">➕ Add a new post</Link>
        <input className="search" placeholder="🔍 search"  onChange={(e)=>{setSearch(e.target.value)}}/>
            <div>  
              <Dropdown placeholder="order by" value={selectedOrder} onChange={(e) => setSelectedOrder(e.value)} options={order} optionLabel="name"/>
            </div>
            {filteredPosts
            .sort((a, b) => {
                if(selectedOrder.name==="ID")
                    return a._id - b._id
                if(selectedOrder.name==="Title")
                    return a.title.localeCompare(b.title);
                if(selectedOrder.name==="Text")
                    return String(a.body).localeCompare(String(b.body));
            })
            .map((post,index)=>{
                return <PostInfo getPosts={getPosts} post={post}/>})}
        </div>
    </div>
}
export default ListPosts