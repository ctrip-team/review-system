import { createBrowserRouter } from "react-router-dom";
import ReviewPage from '../pages/ReviewPage'
import ReviewContent from "../pages/ReviewContent";
const router = createBrowserRouter([
    {
        path: '/',
        element: <ReviewPage />,
        children: [
            {
                path: 'review',
                element: <ReviewContent />
            }
        ]
    }
])


export default router