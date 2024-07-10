import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

const ErrorPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const errorMessage = location.state?.message || "An error occurred.";

  useEffect(() => {
    const timer = setTimeout(() => navigate("/"), 1500)
    return ()=>clearTimeout(timer)
  }, [navigate])

  return (
    <h1>{errorMessage}</h1>
  )
}
export default ErrorPage