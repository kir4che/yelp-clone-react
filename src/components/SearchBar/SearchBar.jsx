import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SearchBar = ({ setFilters }) => {
	const location = useLocation()
	const navigate = useNavigate()
	const [params, setParams] = useState({
		term: '',
		location: 'Taipei, Taiwan',
	})
	const [isTermFocus, setIsTermFocus] = useState(false)
	const [isSearchLoading, setIsSearchLoading] = useState(false)

	const handleSearch = (e) => {
		e.preventDefault()

		setIsSearchLoading(true)

		setTimeout(() => {
			location.pathname.includes('search') &&
				setFilters({ sortby: 'Recommended', priceRange: '', openNow: false, attrs: [], distance: 0 })
			navigate(`/search?find_desc=${params.term}&find_loc=${params.location || 'Taipei, Taiwan'}`)
			setIsSearchLoading(false)
		}, 1500)
	}

	return (
		<form
			className={`${location.pathname.includes('search') ? '' : 'mt-10 mb-4'} flex justify-center`}
			onSubmit={handleSearch}
		>
			<div
				className={`${
					location.pathname.includes('search') ? 'lg:flex' : 'md:flex'
				} border w-full border-gray-200 rounded`}
			>
				<div className='relative flex w-full'>
					<label
						htmlFor='term'
						className={`${
							location.pathname.includes('search') ? 'hidden' : ''
						} py-2.5 min-w-20 text-center bg-zinc-100 border-x text-zinc-500 px-4`}
					>
						Search
					</label>
					<input
						type='text'
						id='term'
						value={params.term}
						placeholder='burgers, barbers, spas, handymen'
						className={`${
							location.pathname.includes('search') ? 'min-w-72' : 'min-w-56'
						} py-2.5 px-3 w-full shadow-inner focus:outline-none placeholder:text-zinc-400`}
						onFocus={() => setIsTermFocus(true)}
						onBlur={() => setIsTermFocus(false)}
						onChange={(e) => setParams({ ...params, term: e.target.value })}
					/>
					<ul
						className={`${location.pathname.includes('search') ? 'left-0' : 'left-20'} ${
							isTermFocus ? 'block' : 'hidden'
						} absolute z-10 border shadow rounded-b py-4 px-5 top-11 bg-white`}
						onMouseLeave={() => setParams({ ...params, term: params.term })}
					>
						{['Restaurants', 'Bezorging', 'Afhalen', 'Accountants', 'Plumbers', 'Garages'].map((item, index) => (
							<li
								className={`${
									location.pathname.includes('search') ? 'min-w-[15.5rem]' : 'min-w-60'
								} flex items-center gap-2 text-zinc-600 cursor-pointer py-1.5 w-full text-left pl-2 hover:bg-zinc-100 rounded`}
								onMouseEnter={() => {
									setParams({ ...params, term: item })
								}}
								onMouseLeave={() => setParams({ ...params, term: '' })}
								onClick={() => {
									setParams({ ...params, term: item })
									setIsTermFocus(false)
								}}
								key={index}
							>
								<img
									width='20'
									height='20'
									src={`https://img.icons8.com/ios/64/3F3F46/${
										item === 'Restaurants'
											? 'dining-room'
											: item === 'Bezorging'
											? 'motorcycle'
											: item === 'Afhalen'
											? 'shopping-basket'
											: item === 'Accountants'
											? 'calculator--v1'
											: item === 'Plumbers'
											? 'plumbing'
											: 'wrench--v1'
									}.png`}
									alt='icon'
								/>
								<span>{item}</span>
							</li>
						))}
					</ul>
				</div>
				<div className='flex w-full'>
					<label
						htmlFor='location'
						className={`${
							location.pathname.includes('search') ? 'hidden' : ''
						} py-2.5 min-w-20 text-center bg-zinc-100 border-x text-zinc-500 px-4`}
					>
						NEAR
					</label>
					<input
						type='text'
						id='location'
						value={params.location}
						placeholder='Current Location'
						className={`${
							location.pathname.includes('search') ? 'min-w-72' : 'min-w-56'
						} py-2.5 px-3 w-full shadow-inner focus:outline-none placeholder:text-zinc-500`}
						onChange={(e) => setParams({ ...params, location: e.target.value })}
					/>
				</div>
			</div>
			<button type='submit' className='bg-red-600 hover:bg-red-700 rounded-r w-16 md:w-12'>
				{isSearchLoading ? (
					<svg
						aria-hidden='true'
						role='status'
						className='inline w-5 h-5 text-white animate-spin'
						viewBox='0 0 100 101'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z' />
						<path
							d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
							fill='currentColor'
						/>
					</svg>
				) : (
					<img
						width='22'
						height='22'
						src='https://img.icons8.com/ios-filled/50/ffffff/search--v1.png'
						className='mx-auto'
						alt='search--v1'
					/>
				)}
			</button>
		</form>
	)
}

export default SearchBar
