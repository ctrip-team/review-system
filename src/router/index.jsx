import { createBrowserRouter } from "react-router-dom";
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import ReviewPage from '../pages/ReviewPage'
import ReviewContent from "../pages/ReviewContent";
import AuthRoute from '../components/AuthRoute'
const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute><ReviewPage /></AuthRoute>,
        children: [
            {
                path: 'review',
                element: <ReviewContent />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '*',
        element: <NotFound />
    }
])


export default router