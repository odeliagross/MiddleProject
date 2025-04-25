import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { format } from 'date-fns';
import { CiEdit } from "react-icons/ci";
import React, { useRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Axios from "axios"
import EditPost from "./EditPost";
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";
import { Card } from 'primereact/card';


const PostInfo=({post,getPosts})=>{
    const [visible, setVisible] = useState(false);
        const toast = useRef(null);

        const accept = () => {
            toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            deleteAction()
        };
        const reject = () => {
            toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        };
    
    const deleteAction=async()=>{
        try {
            const { data } = await Axios.delete(`http://localhost:7002/api/posts/${post._id}`);
            getPosts();
            console.log(data);
        } catch (err) {
            console.error("Error deleting post:", err);
        }
    }
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


        return <Card className="card" title={post.title}>
            <h5>created by: {format(post.createdAt,'dd-MM-yyyy \'at\' HH:mm')}</h5>
            <p>{post.body}</p>
            <Toast ref={toast} />
            <ConfirmPopup />
            <Button onClick={confirm2} icon="pi pi-times" label="Delete" className="p-button-danger"></Button>
            <Button label="✏️ Edit" onClick={() => setVisible(true)} />
            <Dialog header={post.title} visible={visible} onHide={() => {if (!visible) return; setVisible(false);}} style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                <EditPost  getPosts={getPosts} post={post}/>
            </Dialog>
        </Card>
}

export default PostInfo