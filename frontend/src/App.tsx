import { Layout } from "./components/Layout"
import { HomePage } from "./pages/HomePage"
import { QuoteDay } from "./pages/QuoteDay"
import { Navigate, Route, Routes } from "react-router-dom"
import { QuotePage } from "./pages/QuotePage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<Navigate to="/quotes" />} index />
        <Route path="/today" element={<QuoteDay />} />
        <Route path="/quotes/:id" element={<QuotePage/>} />
        <Route path="/quotes" element={
          <>
            <QuoteDay />
            <HomePage />
          </>
        }>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
