import { Routes, Route } from "react-router-dom"

import BuyCredit from "./pages/BuyCredit"
import Home from "./pages/Home"
import Result from "./pages/Result"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"


const App = () => {
  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50">
      <Navbar />
      <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/buy-credits" element={ <BuyCredit /> } />
      <Route path="/result" element={ <Result /> } />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
