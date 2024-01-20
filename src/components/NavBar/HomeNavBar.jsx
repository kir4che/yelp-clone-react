const HomeNavBar = () => (
	<header className='flex justify-between py-4 text-zinc-600 items-center'>
		<div className='space-x-5'>
			<a href='#' className='hover:underline cursor-pointer'>
				Write a Review
			</a>
			<a href='#' className='hover:underline cursor-pointer'>
				Events
			</a>
		</div>
		<div className='space-x-2 md:space-x-4'>
			<button type='button' className='px-2.5 hover:underline cursor-pointer'>
				Log In
			</button>
			<button
				type='button'
				className='bg-white focus:outline-none border active:bg-zinc-50 py-0.5 px-2.5 rounded border-zinc-300 hover:shadow-inner'
			>
				Sign up
			</button>
		</div>
	</header>
)

export default HomeNavBar
