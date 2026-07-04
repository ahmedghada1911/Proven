import { useSelector } from 'react-redux'

export const useAuth = () => {
  const auth = useSelector(state => state.auth)
  return auth
}

export const useIsAdmin = () => {
  const { role } = useSelector(state => state.auth)
  return role === 'admin'
}

export const useIsClinic = () => {
  const { role } = useSelector(state => state.auth)
  return role === 'clinic'
}

export const useIsPatient = () => {
  const { role } = useSelector(state => state.auth)
  return role === 'patient'
}
