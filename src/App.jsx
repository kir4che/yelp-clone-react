import { Link } from 'react-router-dom'
import HomeNavBar from './components/NavBar/HomeNavBar'
import SearchBar from './components/SearchBar/SearchBar'

const App = () => {
	return (
		<div className='max-w-xl px-4 mx-auto md:px-0 md:max-w-2xl lg:max-w-3xl'>
			<HomeNavBar />
			<main className='max-w-2xl py-10 mx-auto lg:max-w-full'>
				<img src='assets/logo.png' className='object-cover w-40 mx-auto' alt='logo' />
				<SearchBar />
				<ul className='flex justify-center gap-6 text-sm font-light text-zinc-700'>
					{['Restaurants', 'Nightlife', 'Services'].map((item, index) => (
						<Link to={`/search?find_desc=${item}&find_loc=Taipei,%20Taiwan`} key={index}>
							<li className='flex items-center gap-0.5 cursor-pointer'>
								<img
									width='20'
									height='20'
									src={`https://img.icons8.com/ios-glyphs/64/3F3F46/${
										item === 'Restaurants' ? 'restaurant' : item === 'Nightlife' ? 'cocktail' : 'service-bell'
									}.png`}
									alt='icon'
								/>
								<span>{item}</span>
							</li>
						</Link>
					))}
				</ul>
			</main>
		</div>
	)
}

export default App
