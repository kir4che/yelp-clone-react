import { useState } from 'react'
import GoogleMap from '../components/GoogleMap/GoogleMap'
import SearchNavBar from '../components/NavBar/SearchNavBar'
import SearchResults from '../components/SearchResults/SearchResults'

const Search = () => {
	const [filters, setFilters] = useState({
		sortby: 'Recommended',
		priceRange: [],
		openNow: false,
		attrs: [],
		distance: 0,
	})
	const [region, setRegion] = useState({
		lat: 48.8566,
		lng: 2.3522,
	})
	const [locations, setLocations] = useState([])

	return (
		<>
			<SearchNavBar setFilters={setFilters} />
			<main className='flex relative z-0'>
				<SearchResults filters={filters} setFilters={setFilters} setRegion={setRegion} setLocations={setLocations} />
				<GoogleMap region={region} locations={locations} />
			</main>
		</>
	)
}

export default Search
