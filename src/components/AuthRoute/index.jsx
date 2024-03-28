import { Navigate } from 'react-router-dom'

// 路由守卫
const AuthRoute = ({ children }) => {
    const userId = localStorage.getItem('reviewer_id')
    if (userId) {
        return <>{children}</>
    } else {
        return <Navigate to={'/login'} replace />
    }
}


export default AuthRoute