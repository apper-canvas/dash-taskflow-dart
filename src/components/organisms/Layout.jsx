import { Outlet } from "react-router-dom"
import Header from "@/components/organisms/Header"

const Layout = () => {
  return (
<div className="min-h-screen bg-background">
      <Header />
<main className="pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout