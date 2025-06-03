import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import ProductList from './components/ProductList.jsx'
import store from './redux/store.js'
import ProductDetail from './components/ProductDetail.jsx'
import './index.css'
import App from './App.jsx'
import Cart from './components/Cart.jsx'
 
const rooted=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[{
       path:"/",
       element:<ProductList/>
    },

  {
    path:"/ProductDetail/:id",
    element:<ProductDetail/>
  },{
    path:"/Menu",
    element:<ProductList/>
  },
   {
    path:"/Cart",
    element:<Cart/>
   }
]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={rooted}  />
    </Provider>

  </StrictMode>,
)
