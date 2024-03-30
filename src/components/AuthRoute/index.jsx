import { Navigate } from 'react-router-dom'

// 路由守卫
const AuthRoute = ({ children }) => {
    const token = localStorage.getItem('token')
    if (token) {
        return <>{children}</>
    } else {
        return <Navigate to={'/login'} replace />
    }
}


export default AuthRoute