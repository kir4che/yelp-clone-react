import SubNavItem from './SubNavItem/SubNavItem'

const SubNav = () => (
	<section className='border-b pt-1'>
		<div className='flex justify-center md:justify-start md:pl-30 lg:pl-32 xl:pl-36'>
			<SubNavItem
				label='Restaurants'
				items={['Delivery', 'Burgers', 'Chinese', 'Italian', 'Reservations', 'Japanese', 'Mexican', 'Thai']}
			/>
			<SubNavItem
				label='Home Services'
				items={[
					'Contractors',
					'Electricians',
					'Home Cleaners',
					'HVAC',
					'Landscaping',
					'Locksmiths',
					'Movers',
					'Plumbers',
				]}
			/>
			<SubNavItem
				label='Auto Services'
				items={[
					'Auto Repair',
					'Auto Detailing',
					'Body Shops',
					'Car Wash',
					'Car Dealers',
					'Oil Change',
					'Parking',
					'Towing',
				]}
			/>
			<SubNavItem
				label='More'
				items={['Dry Cleaning', 'Phone Repair', 'Bars', 'Nightlife', 'Hair Salons', 'Gyms', 'Massage', 'Shopping']}
			/>
		</div>
	</section>
)

export default SubNav
