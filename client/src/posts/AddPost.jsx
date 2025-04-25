import {useState} from "react"
import Axios from "axios"
import {useNavigate} from "react-router-dom"
import { Calendar } from 'primereact/calendar';
import EmojiPicker from "emoji-picker-react";
import React, { useRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { MdOutlineEmojiEmotions, MdSignalWifiStatusbarNull } from "react-icons/md";
import { Chips } from "primereact/chips";
import { InputTextarea } from "primereact/inputtextarea";
import { PanelMenu } from 'primereact/panelmenu';
import { InputText } from 'primereact/inputtext';


        
const AddPost=()=>{
    const [title,setTitle]=useState("")
    const [body,setBody]=useState("")

    
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
     

    const op = useRef(null);


    const submitPost= async(event)=>{
        event.preventDefault()
        const {data}=await Axios.post("http://localhost:7002/api/posts",{title,body})
        console.log({data})
        setTitle("")
        navigate("/posts")
    }
    return <div className="mainContainer">
    <PanelMenu model={items} className="menu" />
    <form className="postForm" onSubmit={submitPost}>
        <InputText value={title} placeholder="❗title" required={true} onChange={(e)=>{setTitle(e.target.value)}}/>
        <br/>
        <InputTextarea autoResize value={body} onChange={(e) => setBody(e.target.value)} rows={5} cols={30} />
            <br />
        <Button disabled={title===""} type="submit">Add</Button>

    </form>
    </div>
}
export default AddPost