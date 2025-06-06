import {BrowserRouter,Route,Routes} from 'react-router-dom' 
import Signup  from './pages/Signup'
import  Signin  from './pages/Signin'
import  Blog  from './pages/Blog'
import Blogs from './pages/Blogs'
import Create from './pages/Create'
import Update from './pages/Update'

 function App(){


  return (
  
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path='/blogs' element={<Blogs/>}/>
          <Route path="/blogs/create" element={<Create/>}/>
          <Route path='/blogs/update/:id' element={<Update/>}/>
    </Routes>
    </BrowserRouter>
    
  )
}

export default App;