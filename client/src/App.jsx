import { ErrorPage, Homepage, Loginpage, Profilepage } from "./scenes"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material/styles"
import { themeSettings } from "./theme"

function App() {
  const mode = useSelector(state => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  const isAuth = Boolean(useSelector(state => state.token))
  const title = "Vibes.com"

  return (
    <>
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<Loginpage title={title} />} />
              <Route path="/home" element={<Homepage title={title}/>} />
              <Route path="/profile/:userid" element={<Profilepage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
