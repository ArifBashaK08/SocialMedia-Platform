import { Homepage, Loginpage, Navbar, Profilepage, Widgets } from "./scenes"
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material/styles"
import { themeSettings } from "./theme"

function App() {
  const mode = useSelector(state => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  // const isAuth = Boolean(useSelector(state => state.token))

  return (
    <>
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<Loginpage title={"Vibes.com"}/>} />
              <Route path="/home" element={<Homepage />} />
              <Route path="/profile/:userid" element={<Profilepage />} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
