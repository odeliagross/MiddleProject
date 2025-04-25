import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './commen/Layout';
import ListTask from './tasks/ListTasks';
import AddTask from './tasks/AddTask';
import ListUsers from './users/ListUsers';
import AddUser from './users/AddUser';
import 'primereact/resources/themes/lara-light-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import ListPosts from './posts/ListPosts';
import AddPost from './posts/AddPost';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
          <Route index element={<h1>home page</h1>} />
            <Route path='/tasks' element={<ListTask />} />
            <Route path='/tasks/add' element={<AddTask />} />
            <Route path='/users' element={<ListUsers />}/>
            <Route path='/users/add' element={<AddUser />} />
            <Route path='/posts' element={<ListPosts />}/>
            <Route path='/posts/add' element={<AddPost />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
