// import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { format } from 'date-fns';
// import { CiEdit } from "react-icons/ci";
import React, { useRef } from 'react';
// import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Axios from "axios"
import EditTask from "./EditTask";
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
// import { InputText } from "primereact/inputtext";
// import { Card } from 'primereact/card';
import { Panel } from 'primereact/panel';
import { Avatar } from 'primereact/avatar';

const TaskInfo=({task,getTasks})=>{
    const [completed,setCompleted]=useState(task.complete)
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
        const {removeData}=await Axios.delete(`http://localhost:7002/api/tasks/`,{
            data:{_id:task._id}
        })  
        getTasks()
        console.log(removeData)
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

    const headerTemplate = (options) => {
        const className = `${options.className} justify-content-space-between`;

        return (
            <div className={className}>
                <div className="flex align-items-center gap-2">
                    <Avatar label={task.icon} size="large" shape="circle" />
                    <span className="font-bold">{` ${task.title}`}</span>
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
                    <Button icon="pi pi-trash"  onClick={confirm2} label="Delete" className="p-button-danger"></Button>
                    <Button style={{background:"#0070a1"}} label="✏️ Edit" onClick={() => setVisible(true)} />
                    <Dialog visible={visible} onHide={() => {if (!visible) return; setVisible(false);}} style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                    <EditTask  getTasks={getTasks} task={task}/>
                    </Dialog>
                    <Button label="Complete" icon="pi pi-check" className="completedBtn" onClick={(e)=>{setCompleted(!completed);updateCompleted(task._id,!completed)}} style={{ backgroundColor: completed ? "#46cb48" : "gray" }}/>
                </div>
            </div>
        );
    };

    const updateCompleted=async(taskId,complete)=>{
       const {data}= await Axios.patch(`http://localhost:7002/api/tasks/${taskId}`,{complete})
       console.log(data.complete)
    }


        return<Panel className="card" headerTemplate={headerTemplate} footerTemplate={footerTemplate} collapsed={true} toggleable>
        {/* <Card className="card" title={task.title} subTitle={format(task.createdAt,'\'created on the: \'dd-MM-yyyy\' at\' HH:mm')}> */}
            {/* <div>{task.icon}</div> */}
            <p>status: {task.status}</p>
            <p>urgencey: {task.urgency}</p>
            <h4>Dealine: {format(task.deadline,'dd-MM-yyyy \'at\' HH:mm')}</h4>
            <div className="tagContainer">{task.tags.map((tag,index)=>{
                return <div className="tags">{tag}</div>
            })}</div>
                
            {/* <Toast ref={toast} />
            <ConfirmPopup />
            <Button onClick={confirm2} icon="pi pi-times" label="Delete" className="p-button-danger"></Button>
            <Button label="✏️ Edit" onClick={() => setVisible(true)} />
            <Dialog header={task.icon} visible={visible} onHide={() => {if (!visible) return; setVisible(false);}} style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                <EditTask  getTasks={getTasks} task={task}/>
            </Dialog>
            <button className="completedBtn" onClick={(e)=>{setCompleted(!completed);updateCompleted(task._id,!completed)}} style={{ backgroundColor: completed ? "green" : "red" }}>Completed</button> */}

        </Panel>
}

export default TaskInfo