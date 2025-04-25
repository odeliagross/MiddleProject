import {useState,useEffect} from "react"
import Axios from "axios"
import {useNavigate} from "react-router-dom"
import { InputText } from "primereact/inputtext";
import { PanelMenu } from 'primereact/panelmenu';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';

const AddUser=()=>{
    const [userName,setUserName]=useState("")
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [address,setAddress]=useState({})
    const [country,setCountry]=useState("")
    const [city,setCity]=useState("")
    const [houseNumber,setHousNumber]=useState("")
    const [street,setStreet]=useState("")
    const [phone,setPhone]=useState("")

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
     
    useEffect(() => {
        setAddress({ country, city, street, houseNumber });
      }, [country, city, street, houseNumber]);

    const submitUser= async(event)=>{
        event.preventDefault()
        try{
            const {data}=await Axios.post("http://localhost:7002/api/users",{username:userName,name,email,phone,address})
            console.log({data})
            setUserName("")
            navigate("/users")
        }
        catch(err){
            if (err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert(err.message);
            }
        }
    }
    return <div className="mainContainer">
        <PanelMenu model={items} className="menu" />
    <form className="userAddForm" onSubmit={submitUser}>
         <div style={{display:"flex",flexDirection:"row",alignItems:"center",gap:"5px"}}><Avatar label={name.charAt(0)} size="large" shape="circle" />
            <h2>{name}</h2></div>
        <InputText value={name} placeholder="❗Name" required={true} onChange={(e)=>{setName(e.target.value)}}/>
        <InputText value={userName}  required={true} placeholder="❗User name" onChange={(e)=>{setUserName(e.target.value)}} />
        <InputText value={phone} required={true} onChange={(e)=>{setPhone(e.target.value)}}  keyfilter="int" placeholder="❗Phone number" />
        <InputText value={email} placeholder="❗Email" required={true} onChange={(e)=>{setEmail(e.target.value)}}/>
        <div>
            <h4>Address</h4>
            <InputText value={country} placeholder="Country" onChange={(e)=>{setCountry(e.target.value)}}/>
            <InputText value={city} placeholder="City" onChange={(e)=>{setCity(e.target.value)}}/>
            <InputText value={street} placeholder="Street" onChange={(e)=>{setStreet(e.target.value)}}/>
            <InputText keyfilter="int" value={houseNumber} placeholder="House Number" onChange={(e)=>{setHousNumber(e.target.value)}}/>
        </div>


        <Button disabled={userName==="" || name==="" || phone==="" || email===""} type="submit">Add</Button>
    </form>
    </div>
}
export default AddUser