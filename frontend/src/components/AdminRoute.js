import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const AdminRoute = () => {
    const { userInfo } = useSelector((state)=> state.auth)
    console.log(userInfo);
    
    return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to='/login'/> 
    
}

export default AdminRoute

