import Browse from "./Browse";
import { RouterProvider} from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./LoginPage";


const Body = () => {



  const appRouter = createBrowserRouter([
    {
      path:"/",
      element: <LoginPage />

    },
    {
      path:"/browse",
      element: <Browse />
    }
  
  ])



  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body;
