import { createBrowserRouter } from "react-router-dom";
import Login from '../pages/Login'
import Home from '../pages/Home'
import RoleManagementList from '../pages/RoleManagementList'
import RoleCreationForm from '../pages/RoleCreationForm'
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
                index: true,
                element: <Home />
            },
            {
                path: 'review',
                element: <ReviewContent />
            },
            {
                path: 'role',
                element: <RoleManagementList />
            },
            {
                path: 'newrole',
                element: <RoleCreationForm />
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