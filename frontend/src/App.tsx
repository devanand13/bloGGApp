import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'
import { ProtectedRoute } from './utils/ProtectedRoutes'
import { AuthRedirectRoute } from './utils/AuthRedirectRoute'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<AuthRedirectRoute> <Signup /> </AuthRedirectRoute>} />
          <Route path="/signin" element={<AuthRedirectRoute><Signin /></AuthRedirectRoute>} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/" element={<ProtectedRoute> <Blogs /> </ProtectedRoute> } />
          <Route path="/publish" element={<ProtectedRoute>  <Publish/>  </ProtectedRoute>  } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App