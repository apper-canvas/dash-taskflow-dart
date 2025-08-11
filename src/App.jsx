import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import HomePage from "@/components/pages/HomePage"
import Layout from "@/components/organisms/Layout"

function App() {
  return (
<div className="min-h-screen bg-background px-4 sm:px-6 lg:px-8">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="toast-container"
        toastClassName="rounded-xl shadow-lg"
        bodyClassName="text-sm font-medium"
        progressClassName="bg-white bg-opacity-30"
        style={{ zIndex: 9999 }}
      />
    </div>
  )
}

export default App