import { createBrowserRouter } from "react-router-dom";
import ReviewPage from '../pages/ReviewPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <ReviewPage />
    }
])


export default router