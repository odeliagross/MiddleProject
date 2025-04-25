import {Outlet} from "react-router-dom"
import Navigation from "./Navigation"
const Layout=()=>{
    return <div className="main">
            <header>
                <Navigation />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>footer</footer>
            </div>
}
export default Layout