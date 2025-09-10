import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">Welcome to Weather App</h1>
      <div className="mt-4 space-x-4">
        <Link className="text-blue-600" to="/login">Login</Link>
        <Link className="text-green-600" to="/register">Register</Link>
      </div>
    </div>
  )
}
