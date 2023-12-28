import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.jsx'
import Search from './routes/Search.jsx'
import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<App />} />
			<Route path='/search' element={<Search />} />
		</Routes>
	</BrowserRouter>
)
