import { NavLink } from "react-router-dom"

const Navigation = ()=>{
    return <div className="navigate">
    <NavLink to="/">Home page</NavLink>
    <NavLink to="/tasks/">Task list</NavLink>
    <NavLink to="/tasks/add">Add new task</NavLink>
    <NavLink to="users/">User list</NavLink>
    <NavLink to="/users/add">Add user</NavLink>
    <NavLink to="posts/">Posts list</NavLink>
    <NavLink to="/posts/add">New post</NavLink>


    </div>
}

export default Navigation