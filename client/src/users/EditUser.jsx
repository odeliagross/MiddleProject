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
import { InputText } from "primereact/inputtext";
import { InputNumber } from 'primereact/inputnumber';


const EditUser=({user,getUsers})=>{
        const [name,setName]=useState(user.name)
        const [email,setEmail]=useState(user.email)
        const [phone,setPhone]=useState(user.phone)
        const [country,setCountry]=useState(user.address.country)
        const [city,setCity]=useState(user.address.city)
        const [houseNumber,setHousNumber]=useState(user.address.houseNumber)
        const [street,setStreet]=useState(user.address.street)

        const op = useRef(null);

    
        const navigate=useNavigate()

        const editUser= async(event)=>{
            event.preventDefault()
            const updatedAddress = { country, city, street, houseNumber };
            try{
            console.log(user._id)
            const {data}=await Axios.patch(`http://localhost:7002/api/users/${user._id}`,{name,phone,email,address:updatedAddress})
            console.log({data})
            navigate("/users")
            window.location.reload()
            }catch(err){
                if (err.response.data.message) {
                    alert(err.response.data.message);
                } else {
                    alert(err.message);
                }
            }

            
        }



        return <>
        <form onSubmit={editUser}>
            <InputText value={name} placeholder="Name" required={true} onChange={(e)=>{setName(e.target.value)}}/>
            <InputText value={phone} required={true} onChange={(e)=>{setPhone(e.target.value)}}  keyfilter="int" placeholder="Phone number" />
            <InputText value={email} placeholder="Email" required={true} onChange={(e)=>{setEmail(e.target.value)}}/>
            <div>
            <h4>Address</h4>
                <InputText value={country} placeholder="Country" onChange={(e)=>{setCountry(e.target.value)}}/>
                <InputText value={city} placeholder="City" onChange={(e)=>{setCity(e.target.value)}}/>
                <InputText value={street} placeholder="Street" onChange={(e)=>{setStreet(e.target.value)}}/>
                <InputText min={1} keyfilter="int" value={houseNumber} placeholder="House Number" onChange={(e)=>{setHousNumber(e.target.value)}}/>
            </div>
                <br />
            <Button type="submit"> Save</Button>

    
        </form>
        </>
}
export default EditUser