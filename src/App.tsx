import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { MainLayout } from './pages/mainLayout'
import { Order } from './pages/orders'

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Order />}></Route>
        </Route>
      </>
    )
  )

  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
