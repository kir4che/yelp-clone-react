import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const SubNavItem = ({ label, items = [] }) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [isOpen, setIsOpen] = useState('')

	const handleSearchParamUpdate = (item) => {
		searchParams.set('find_desc', item)
		setSearchParams(searchParams)
	}

	return (
		<div>
			<button
				type='button'
				className='inline-flex font-light items-center text-sm gap-2 px-4 py-2 transition duration-150 ease-in-out bg-white border-b-4 border-transparent hover:border-red-500 focus:outline-none'
				onMouseOver={() => setIsOpen(label)}
				onMouseLeave={() => setIsOpen('')}
				onClick={() => handleSearchParamUpdate(label)}
			>
				<span>{label}</span>
				<img
					width='16'
					height='16'
					src='https://img.icons8.com/ios-glyphs/30/expand-arrow--v1.png'
					alt='expand-arrow--v1'
				/>
			</button>
			<div
				className={`${isOpen === label ? 'inline' : 'hidden'} transition-all duration-300 transform -translate-y-2`}
				onMouseOver={() => setIsOpen(label)}
				onMouseLeave={() => setIsOpen('')}
			>
				<div className='absolute w-max grid grid-cols-2 bg-white border gap-x-2 rounded-md p-3 shadow-md outline-none'>
					{items.map((item, index) => (
						<button
							type='button'
							className='text-left text-sm font-medium px-2 py-1.5 hover:bg-zinc-100 rounded'
							onClick={() => handleSearchParamUpdate(item)}
							key={index}
						>
							{item}
						</button>
					))}
				</div>
			</div>
		</div>
	)
}

export default SubNavItem
