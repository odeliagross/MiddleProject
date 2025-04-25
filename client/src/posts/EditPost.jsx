import {useState} from "react"
import Axios from "axios"
import {useNavigate} from "react-router-dom"
import React, { useRef } from 'react';
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";



const EditPost=({post,getPost})=>{
        const [title,setTitle]=useState(post.title)
        const [body,setBody]=useState(post.body)

        const navigate=useNavigate()

        const editPost= async(event)=>{
            event.preventDefault()
            console.log(post._id)
            const {data}=await Axios.patch(`http://localhost:7002/api/posts/${post._id}`,{title,body})
            console.log({data})
            navigate("/posts")
            window.location.reload()
        }
        return <>
        <form className="postForm"  onSubmit={editPost}>
            <InputText value={title} placeholder={title} required={true} onChange={(e)=>{setTitle(e.target.value)}}/>
            <InputTextarea autoResize value={body} onChange={(e) => setBody(e.target.value)} rows={5} cols={30} />
            <br />
            <Button type="submit"> Save</Button>
        </form>
        </>
}
export default EditPost