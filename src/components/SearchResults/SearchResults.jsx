import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const SearchResults = ({ filters, setFilters, setRegion, setLocations }) => {
	const [searchParams, setSearchParams] = useSearchParams()
	let term = searchParams.get('find_desc')
	let location = searchParams.get('find_loc')

	const [isLoading, setIsLoading] = useState(false)
	const [isSortOpen, setIsSortOpen] = useState(false)
	const [isFilterOpen, setIsFilterOpen] = useState(false)
	const [isPriceRangeFilterOpen, setIsPriceRangeFilterOpen] = useState(false)

	const handleFilter = (filterType, value) => {
	  let updatedValues;
	
	  switch (filterType) {
	    case 'priceRange':
	    case 'attrs':
	      updatedValues = filters[filterType].includes(value) ? filters[filterType].filter((filter) => filter !== value) : [...filters[filterType], value]
	      setFilters({ ...filters, [filterType]: updatedValues })
	      if (updatedValues.length > 0) {
	        const paramValue = updatedValues.length > 1 ? updatedValues.join(',') : updatedValues[0]
	        searchParams.set(filterType, paramValue)
	       } else searchParams.delete(filterType)
	      break;
	    case 'open':
	      setFilters({ ...filters, openNow: value })
	      value ? searchParams.set(filterType, value) : searchParams.delete(filterType)
	      break;
	    case 'radius':
	      setFilters({ ...filters, distance: value })
	      searchParams.set(filterType, value)
	      break;
	    default:
	      break;
	  }

	  setSearchParams(searchParams)
	}

	const handleFilterClear = () => {
		setFilters({ sortby: filters.sortby, priceRange: '', openNow: false, attrs: [], distance: 0 })
		searchParams.delete('priceRange')
		searchParams.delete('open')
		searchParams.delete('attrs')
		searchParams.delete('radius')
		setSearchParams(searchParams)
	}

	const [businesses, setBusinesses] = useState([])
	const totalBusinesses = 5

	const fetchBusinesses = async () => {
		setIsLoading(true)

		let params =
			(searchParams.get('priceRange') ? `&price=${searchParams.get('priceRange')}` : '') +
			(searchParams.get('attrs') ? `&attributes=${searchParams.get('attrs')}` : '') +
			(searchParams.get('open') ? `&open_now=${searchParams.get('open')}` : '') +
			(searchParams.get('radius') ? `&radius=${searchParams.get('radius')}` : '') +
			`&sort_by=${searchParams.get('sortby') || 'best_match'}`

		try {
			const responce = await fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}${params}&limit=${totalBusinesses}`,
				{
					method: 'GET',
					headers: {
						accept: 'application/json',
						'x-requested-with': 'xmlhttprequest',
						'Access-Control-Allow-Origin': '*',
						Authorization: `Bearer ${import.meta.env.VITE_YELP_API_KEY}`,
					},
				}
			)

			const data = await responce.json()
			setBusinesses(data.businesses)
			setRegion({lat: data.region.center.latitude, lng: data.region.center.longitude})
			setLocations(data.businesses.map((business) => business.coordinates))
			setIsLoading(false)
		} catch (error) {
			console.error('Error: ', error)
		}
	}

	useEffect(() => {
		fetchBusinesses()
	}, [searchParams])

	return (
		<div className='h-full w-full xl:flex shadow-inner'>
			{/* 篩選器 */}
			<div
				className={`${
					isFilterOpen ? 'filter-panel open pr-8' : 'filter-panel xl:pr-0'
				} absolute pl-8 py-4 basis-80 top-0                                                                                                                                                                                                                                                                                                                                                                                                                                                                          z-50 h-full xl:static bg-white`}
			>
				<section className='border-b pt-2 pb-5 border-zinc-200'>
					<div className='mb-4 flex justify-between'>
						<p className='font-semibold text-sm tracking-wide'>Filters</p>
						{(filters.priceRange.length !== 0 ||
							filters.openNow ||
							filters.attrs.length !== 0 ||
							filters.distance !== 0) && (
							<button type='button' className='text-xs hover:underline text-teal-700 mb-2' onClick={handleFilterClear}>
								Clear All
							</button>
						)}
					</div>
					{['$', '$$', '$$$', '$$$$'].map((price, index) => (
						<button
							type='button'
							className={`${
								filters.priceRange.includes(index + 1) ? 'border border-teal-600 bg-teal-600/10 text-teal-700' : ''
							} ${
								index === 0
									? 'border-l rounded-r rounded-full border-y'
									: index === 1
									? 'border-y border-l'
									: index === 2
									? 'border'
									: 'border-r border-y rounded-full rounded-l'
							} w-12 py-1.5 hover:bg-zinc-300 hover:transition-colors hover:ease-out hover:duration-300 border-zinc-300 text-xs font-semibold`}
							onClick={() => handleFilter('priceRange', index+1)}
							key={index}
						>
							{price}
						</button>
					))}
				</section>
				<section className='border-b py-3 border-zinc-200'>
					<p className='font-semibold mb-3 text-sm tracking-wide'>Suggested</p>
					<label htmlFor='OpenNow' className='inline-flex items-center gap-2'>
						<input
							type='checkbox'
							id='OpenNow'
							className='h-[1.15rem] w-[1.15rem] accent-teal-600 rounded'
							checked={filters.openNow}
							onChange={() => handleFilter('open', !filters.openNow)}
						/>
						<span className='text-sm'>Open Now</span>
					</label>
				</section>
				<section className='border-b py-3 border-zinc-200'>
					<p className='font-semibold mb-3 text-sm tracking-wide'>Features</p>
					<ul className='space-y-1'>
						{[
							'wifi_free',
							'restaurants_takeout',
							'parking_garage',
							'liked_by_vegetarians',
							'wheelchair_accessible',
						].map((attr, index) => (
							<li key={index}>
								<label htmlFor={attr} className='inline-flex items-center gap-2'>
									<input
										type='checkbox'
										id={attr}
										className='h-[1.15rem] w-[1.15rem] accent-teal-600 rounded'
										checked={filters.attrs.includes(attr)}
										onChange={() => handleFilter('attrs', attr)}
									/>
									<span className='text-sm'>{attr.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</span>
								</label>
							</li>
						))}
					</ul>
				</section>
				<section className='py-3'>
					<p className='font-semibold mb-3 text-sm tracking-wide'>Distance</p>
					<ul className='space-y-1'>
						{[40000, 8000, 4000, 2000, 400].map((distance, index) => (
							<li key={index}>
								<label htmlFor={distance} className='inline-flex items-center gap-2'>
									<input
										type='radio'
										name='distanceOption'
										id={distance}
										className='h-[1.15rem] w-[1.15rem] accent-teal-600 rounded'
										checked={filters.distance === distance}
										onChange={() => handleFilter('radius', distance)}
									/>
									<span className='text-sm'>
										{distance === 40000
											? "Bird's-eye View"
											: distance === 8000
											? 'Driving (8 km.)'
											: distance === 4000
											? 'Biking (4 km.)'
											: distance === 2000
											? 'Walking (2 km.)'
											: 'Within 4 blocks.'}
									</span>
								</label>
							</li>
						))}
					</ul>
				</section>
			</div>
			{/* 打開篩選器後加上黑底 */}
			{isFilterOpen && (
				<div
					className='absolute z-10 w-screen xl:hidden h-screen top-0 bg-black/60'
					onClick={() => setIsFilterOpen(false)}
				/>
			)}
			{/* 搜尋結果 */}
			<div className='px-5 w-full sm:px-10 py-4'>
				<section className='relative flex items-baseline flex-col lg:flex-row justify-between'>
					<h2 className='font-extrabold my-2 text-2xl'>
						The {totalBusinesses} Best Places near {location}
					</h2>
					<p className='text-sm tracking-wide' onClick={() => setIsSortOpen(!isSortOpen)}>
						Sort: <span className='font-bold cursor-pointer hover:underline'>{filters.sortby}</span>
						<img
							width='12'
							height='12'
							src='https://img.icons8.com/ios-glyphs/30/expand-arrow--v1.png'
							className='inline-block ml-2 mb-0.5'
							alt='expand-arrow--v1'
						/>
					</p>
					<ul className={`${isSortOpen ? 'block' : 'hidden'} absolute z-20 shadow-xl lg:right-0 bg-white p-3 top-full`}>
						{['Recommended', 'Highest Rated', 'Most Reviewed', 'Distance'].map((sort, index) => (
							<li
								className={`${
									filters.sortby === sort ? 'bg-teal-600/10 font-bold text-teal-700' : 'hover:bg-zinc-200/50'
								} 
                text-sm p-2.5 rounded cursor-pointer`}
								onClick={() => {
									searchParams.set(
										'sortby',
										sort === 'Recommended'
											? 'best_match'
											: sort === 'Highest Rated'
											? 'rating'
											: sort === 'Most Reviewed'
											? 'review_count'
											: 'distance'
									)
									setSearchParams(searchParams)
									setFilters({ ...filters, sortby: sort })
									setIsSortOpen(false)
								}}
								key={index}
							>
								{sort}
							</li>
						))}
					</ul>
				</section>
				<section className='border-b xl:hidden flex space-x-2 py-4'>
					<button
						type='button'
						className='rounded-full flex items-center gap-2 px-3 text-xs py-1.5 font-medium bg-white border border-zinc-400 hover:bg-zinc-200/50'
						onClick={() => setIsFilterOpen(!isFilterOpen)}
					>
						<img
							width='12'
							height='12'
							src='https://img.icons8.com/material-sharp/24/horizontal-settings-mixer--v1.png'
							alt='horizontal-settings-mixer--v1'
						/>
						<span>All</span>
					</button>
					<section className='z-10'>
						<button
							type='button'
							className='rounded-full flex items-center gap-1 px-3 text-xs py-1.5 font-medium bg-white border border-zinc-400 hover:bg-zinc-200/50'
							onClick={() => setIsPriceRangeFilterOpen(!isPriceRangeFilterOpen)}
						>
							<span>Price</span>
							<img
								width='10'
								height='10'
								src='https://img.icons8.com/ios-glyphs/30/expand-arrow--v1.png'
								alt='expand-arrow--v1'
							/>
						</button>
						<div
							className={`${
								isPriceRangeFilterOpen ? 'inline' : 'hidden'
							} transition-all duration-300 transform -translate-y-2`}
						>
							<ul className='absolute bg-white border rounded-md space-y-1 p-5 w-36 shadow-md outline-none'>
								{['$', '$$', '$$$', '$$$$'].map((price, index) => (
									<li key={index}>
										<label
											htmlFor={index}
											className='inline-flex w-full items-center gap-2 pl-2 py-1.5 rounded hover:bg-zinc-100'
										>
											<input
												type='checkbox'
												id={index}
												className='h-[1.15rem] w-[1.15rem] accent-teal-600 rounded'
												checked={filters.priceRange.includes(index + 1)}
												onChange={() => handleFilter('priceRange', index+1)}
											/>
											<span className='text-sm'>{price}</span>
										</label>
									</li>
								))}
							</ul>
						</div>
					</section>
					<button
						type='button'
						className={`${
							filters.openNow ? 'border-teal-600 bg-teal-600/15 text-teal-700' : ''
						} rounded-full flex items-center gap-2 px-3 text-xs py-1.5 font-medium bg-white border border-zinc-400 hover:bg-zinc-200/50`}
						onClick={() => handleFilter('open', !filters.openNow)}
					>
						<span>Open Now</span>
					</button>
				</section>
				{isLoading ? (
					<div className='flex items-center gap-3 mt-8'>
						<svg
							className='animate-spin text-zinc-400 h-8 w-8'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
						>
							<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
							<path
								className='opacity-75'
								fill='currentColor'
								d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
							></path>
						</svg>
						<span className='text-3xl text-zinc-500 font-bold'>Loading...</span>
					</div>
				) : (
					<ul className='pt-4 space-y-6'>
						{businesses &&
							businesses.map((business, index) => (
								<div key={index}>
									<li className='rounded hover:shadow-md p-5'>
										<a
											href={business.url}
											target='_blank'
											rel='noreferrer'
											className='flex flex-col sm:flex-row relative gap-6'
										>
											<div>
												<button
													className={`${
														business.is_closed ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100'
													} text-sm px-3 absolute left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-20 lg:left-14 -top-2 rounded-full font-bold`}
												>
													{business.is_closed ? 'Closed' : 'Open'}
												</button>
												<img
													src={business.image_url}
													className='w-full sm:min-w-60 h-56 lg:min-w-44 object-center lg:h-40 object-cover rounded-md'
													alt='business-cover'
												/>
											</div>
											<div className='flex w-full flex-col gap-4 sm:gap-0 justify-between'>
												<div>
													<h3 className='font-bold text-xl'>
														<span>{index + 1}. </span>
														<span className='hover:underline'>{business.name}</span>
													</h3>
													<p className='text-sm flex items-end mb-2 gap-1'>
														<p className='text-zinc-600'>{business.alias.split('-')[0]}</p>
														<img
															width='22'
															height='22'
															src='https://img.icons8.com/color/48/filled-star--v1.png'
															alt='filled-star--v1'
														/>
														<span className='font-semibold'>{business.rating}</span>
														<span className='text-zinc-500 hidden md:inline font-light'>
															({business.review_count} reviews)
														</span>
													</p>
													<p className='text-sm text-gray-500 space-x-2'>
														{business.categories.map((category, index) => (
															<span key={index} className='text-xs font-bold py-1 px-1.5 rounded bg-zinc-200'>
																{category.title}
															</span>
														))}
														<span>
															{business.price}・{business.location.city.replace('District', '')}
														</span>
													</p>
												</div>
												<div className='text-xs text-zinc-700 space-y-1'>
													<p className='flex gap-1'>
														<img
															width='18'
															height='18'
															src='https://img.icons8.com/ios-glyphs/40/3f3f46/phone--v1.png'
															alt='phone--v1'
														/>
														<span>{business.display_phone}</span>
													</p>
													<a
														href={`https://maps.google.com/?q=${business.coordinates.latitude},${business.coordinates.longitude}`}
														target='_blank'
														rel='noreferrer'
														className='space-x-1 flex items-start hover:underline'
													>
														<img
															width='18'
															height='18'
															src='https://img.icons8.com/material-rounded/40/3f3f46/marker.png'
															alt='marker'
														/>
														<p className='space-x-1'>
															{business.location.display_address.map((address, index) => (
																<span key={index}>{address}</span>
															))}
														</p>
													</a>
												</div>
											</div>
										</a>
									</li>
									<hr className='-mx-4' />
								</div>
							))}
					</ul>
				)}
			</div>
		</div>
	)
}

export default SearchResults
