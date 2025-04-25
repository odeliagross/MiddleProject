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
import { PanelMenu } from 'primereact/panelmenu';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Avatar } from 'primereact/avatar';

        
const AddTask=()=>{
    const [title,setTitle]=useState("New Task")
    const [urgency,setUrgency]=useState(1)
    const [status,setStatus]=useState("Assigned")
    const [tags,setTags]=useState([])
    const [inputTag,setInputTag]=useState("")
    const [icon,setIcon]=useState(title.charAt(0))


    const [datetime12h, setDateTime12h] = useState(new Date());
    const op = useRef(null);

    const statusOption=[
       { name:"Assigned"},
       { name:"in process"},
       {name:"Canceled"}
    ]


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
   
// console.log(tags)
//     const handleTag = (tagValue) => {
//         if (tagValue && !tags.includes(tagValue)) {
//           setTags([...tags, tagValue]);
//         }
//       };

    const navigate=useNavigate()
    const submitTask= async(event)=>{
        event.preventDefault()
        const {data}=await Axios.post("http://localhost:7002/api/tasks",{title,status:status.name,urgency,tags,icon,deadline:datetime12h})
        console.log({data})
        setTitle("")
        navigate("/tasks")
    }
    return <div className="mainContainer">
        <PanelMenu model={items} className="menu" />
    <form className="addTaskForm" onSubmit={submitTask}>
        <div style={{display:"flex",flexDirection:"row",alignItems:"center",gap:"5px"}}><Avatar label={icon} size="large" shape="circle" />
        <h2>{title}</h2></div>
        <InputText value={title} placeholder="title" required={true} onChange={(e)=>{setTitle(e.target.value)}}/>
        <br />
        <Dropdown placeholder="Assigned" value={status} onChange={(e) => setStatus(e.value)} options={statusOption} optionLabel="name" />
        {/* <input value={inputTag} placeholder="enter tags" onChange={(e)=>{setInputTag(e.target.value)}}
         onKeyDown={(e)=>{
            if(e.key==="Enter"){
                e.preventDefault()
                handleTag(inputTag)
                setInputTag("")
            }}} /> */}
            <Chips placeholder="tags" value={tags} onChange={(e) =>{setTags(e.value)}} />
            <Calendar placeholder={new Date()} value={datetime12h} onChange={(e) => setDateTime12h(e.value)} showTime hourFormat="12" />
            <InputNumber  min={1} max={5} value={urgency} onValueChange={(e) => setUrgency(e.value)} showButtons buttonLayout="vertical" style={{ width: '4rem',scale:"inherit" }} 
                    decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
            <br />
            <Button type="button" icon={<MdOutlineEmojiEmotions/>} onClick={(e) => op.current.toggle(e)} />
            <OverlayPanel ref={op}>
                <EmojiPicker onEmojiClick={(e) =>{setIcon(e.emoji);op.current.hide();}} />
            </OverlayPanel>
            


            <br />
        <Button disabled={title===""} type="submit">Add</Button>

    </form>
    </div>
}
export default AddTask