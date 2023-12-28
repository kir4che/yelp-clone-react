import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import SubNav from './SubNav/SubNav'

const SearchNavBar = ({ setFilters }) => {
	return (
		<header className='relative z-10'>
			<section className='flex items-center justify-center px-4 pt-4 pb-1 bg-white md:px-10 lg:px-12 xl:px-14 md:justify-between'>
				<div className='flex items-center gap-4 xl:gap-6'>
					<Link to='/'>
						<img src='assets/logo.png' className='object-cover w-20' alt='logo' />
					</Link>
					<SearchBar setFilters={setFilters} />
				</div>
				<div className='flex-col hidden gap-1 md:flex lg:flex-row lg:space-x-3'>
					<button
						type='button'
						className='px-4 py-2 font-medium bg-white border rounded focus:outline-none border-zinc-300 hover:bg-zinc-50 active:shadow-inner'
					>
						Log In
					</button>
					<button
						type='button'
						className='px-4 py-2 font-medium text-white bg-red-600 rounded focus:outline-none hover:bg-red-700 active:shadow-inner'
					>
						Sign up
					</button>
				</div>
			</section>
			<SubNav />
		</header>
	)
}

export default SearchNavBar
