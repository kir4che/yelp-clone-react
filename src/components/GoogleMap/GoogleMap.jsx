import { APIProvider, AdvancedMarker, Map, Pin } from '@vis.gl/react-google-maps'

const GoogleMap = ({ region, locations }) => (
	<APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
		<div className='hidden lg:block basis-[480px]'>
			<Map center={region} zoom={12.5} mapId={import.meta.env.VITE_GOOGLE_MAP_ID} locations={locations}>
				{locations.map((position, index) => (
					<AdvancedMarker
						position={{
							lat: position.latitude,
							lng: position.longitude,
						}}
						key={index}
					>
						<Pin background={'#D32322'} glyphColor={'#fff'} borderColor={'#fff'}>
							<p className='text-base font-bold'>{index + 1}</p>
						</Pin>
					</AdvancedMarker>
				))}
			</Map>
		</div>
	</APIProvider>
)

export default GoogleMap
