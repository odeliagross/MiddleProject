import {useState} from "react"
import Axios from "axios"
import {useNavigate} from "react-router-dom"
import { Calendar } from 'primereact/calendar';
import EmojiPicker from "emoji-picker-react";
import React, { useRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { MdOutlineEmojiEmotions, MdSignalWifiStatusbarNull } from "react-icons/md";
import { Dialog } from 'primereact/dialog';
import { Chips } from "primereact/chips";
import { Avatar } from 'primereact/avatar';
import { InputText } from "primereact/inputtext";
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';

const EditTask=({task,getTasks})=>{
        const [title,setTitle]=useState(task.title)
        const [urgency,setUrgency]=useState(task.urgency)
        const [status,setStatus]=useState(task.status)
        const [tags,setTags]=useState(task.tags)
        const [inputTag,setInputTag]=useState("")
        const [icon,setIcon]=useState(task.icon)
        const [datetime12h, setDateTime12h] = useState(task.deadline);
        const op = useRef(null);

        const statusOption=[
            { name:"Assigned"},
            { name:"in process"},
            {name:"Canceled"}
         ]

        // const handleTag = (tagValue) => {
        //     const newTag = tagValue.trim();
        //     if (newTag && !tags.includes(newTag)) {
        //       setTags([...tags, newTag]);
        //     }
        //   };
    
        const navigate=useNavigate()

        const editTask= async(event)=>{
            event.preventDefault()
            console.log(task._id)
            const {data}=await Axios.patch(`http://localhost:7002/api/tasks/${task._id}`,{title,status,urgency,tags,icon,deadline:datetime12h})
            console.log({data})
            navigate("/tasks")
        }
        return <>
        <form onSubmit={editTask}>
            <div style={{display:"flex",flexDirection:"row",alignItems:"center",gap:"5px"}}><Avatar label={icon} size="large" shape="circle" />
                    <h2>{title}</h2></div>
            <InputText value={title} placeholder={title} required={true} onChange={(e)=>{setTitle(e.target.value)}}/>
            <InputNumber  min={1} max={5} value={urgency} onValueChange={(e) => setUrgency(e.value)} showButtons buttonLayout="vertical" style={{ width: '4rem',scale:"inherit" }} 
                decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
            <br />          
            <Chips placeholder="add tags" value={tags} onChange={(e) =>{setTags(e.value)}} />
            <Calendar value={datetime12h} placeholder={new Date()} onChange={(e) => setDateTime12h(e.value)} showTime hourFormat="12" />
            <Dropdown placeholder="Assigned" value={status} onChange={(e) => setStatus(e.value)} options={statusOption} optionLabel="name" />
            <Button type="button" icon={<MdOutlineEmojiEmotions/>} onClick={(e) => op.current.toggle(e)} />
            <OverlayPanel ref={op}>
                <EmojiPicker onEmojiClick={(e) =>{setIcon(e.emoji);op.current.hide();}} />
            </OverlayPanel>
                <br />
            <Button onClick={() => { window.location.reload()}}> Save</Button>
    
        </form>
        </>
}
export default EditTask