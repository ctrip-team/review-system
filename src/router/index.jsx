import { createBrowserRouter } from "react-router-dom";
import Login from '../pages/Login'
import Home from '../pages/Home'
import RoleManagementList from '../pages/RoleManagementList'
import RoleCreationForm from '../pages/RoleCreationForm'
import NotFound from '../pages/NotFound'
import ReviewPage from '../pages/ReviewPage'
import ReviewContent from "../pages/ReviewContent";
import DeletePage from "../pages/DeletePage";
import AuthRoute from '../components/AuthRoute'
const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute><ReviewPage /></AuthRoute>,
        children: [
            {
                index: true,
                element: <AuthRoute><Home /></AuthRoute>
            },
            {
                path: 'review',
                element: <AuthRoute><ReviewContent /></AuthRoute>
            },
            {
                path: 'delete',
                element: <AuthRoute><DeletePage /></AuthRoute>
            },
            {
                path: 'role',
                element: <AuthRoute><RoleManagementList /></AuthRoute>
            },
            {
                path: 'newrole',
                element: <AuthRoute><RoleCreationForm /></AuthRoute>
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