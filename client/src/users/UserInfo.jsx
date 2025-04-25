import { MdDelete } from "react-icons/md";
import Axios from "axios"
import React, { useRef } from 'react';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import EditUser from "./EditUser";
import {useState,useEffect} from "react"
import { Dialog } from 'primereact/dialog';
import { Avatar } from 'primereact/avatar';


const UserInfo=({user,getUsers})=>{
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        deleteAction()
    };
    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    };
    const confirm2 = (event) => {
            confirmPopup({
                target: event.currentTarget,
                message: 'Do you want to delete this record?',
                icon: 'pi pi-info-circle',
                defaultFocus: 'reject',
                acceptClassName: 'p-button-danger',
                accept,
                reject
            });
        };

const deleteAction=async()=>{
    const {removeData}=await Axios.delete("http://localhost:7002/api/users/",{
        data:{id:user._id}
    })  
    getUsers()
    console.log(removeData)
}
const headerTemplate = (options) => {
        const className = `${options.className} justify-content-space-between`;

        return (
            <div className={className}>
                <div className="flex align-items-center gap-2">
                    <Avatar label={user.name.charAt(0)} size="large" shape="circle" />
                    <span className="font-bold">{` ${user.name}`}</span>
                </div>
                <div>
                    {options.togglerElement}
                </div>
            </div>
        );
    };
    const footerTemplate = (options) => {
        const className = `${options.className} flex flex-wrap align-items-center justify-content-between gap-3`;
        return (
            <div className={className}>
                <div className="cardFooter">
                <Toast ref={toast} />
                <ConfirmPopup />
                <Button onClick={confirm2} icon="pi pi-times" label="Delete" className="p-button-danger"></Button>
                <Button label="✏️ Edit" onClick={() => setVisible(true)} />
                <Dialog header={user.username} visible={visible} onHide={() => {if (!visible) return; setVisible(false);}} style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                    <EditUser  getUsers={getUsers} user={user}/>
                </Dialog>   
                </div>
            </div>
        );
    }

 return <Panel  className="card" footerTemplate={footerTemplate} headerTemplate={headerTemplate} collapsed={true} toggleable> 
        <h4>Username: {user.username}</h4>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <Panel header="Address" collapsed={true} className="addressPanel" toggleable>
            <p>Country: {user.address?.country||""}</p>
            <p>City: {user.address?.city||""}</p>
            <p>Street: {user.address?.street||""}</p>
            <p>House Number: {user.address?.houseNumber||""}</p>
        </Panel>
        

        {/* <Toast ref={toast} />
        <ConfirmPopup />
        <Button onClick={confirm2} icon="pi pi-times" label="Delete" className="p-button-danger"></Button>
        <Button label="✏️ Edit" onClick={() => setVisible(true)} />
        <Dialog header={user.username} visible={visible} onHide={() => {if (!visible) return; setVisible(false);}} style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
            <EditUser  getUsers={getUsers} user={user}/>
        </Dialog>     */}
    </Panel>
}

export default UserInfo