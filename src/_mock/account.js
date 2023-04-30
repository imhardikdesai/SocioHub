import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Account = () => {
    const { userDetails } = useContext(AuthContext)
    return userDetails
}

export default Account
