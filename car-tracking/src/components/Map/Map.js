import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";

const center = {
	lat: 29.989871698356293,
	lng: 31.128345066629592,
};

const Map = ({ socket }) => {
	const [carsList, setCarsList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const updateCarLocation = useCallback((data) => {
		setCarsList((prevCarsList) => {
			const updatedCarsList = [...prevCarsList];
			const carIndex = updatedCarsList.findIndex(
				(car) => car.id === data.id
			);
			if (carIndex > -1) {
				updatedCarsList[carIndex] = data;
			}
			return updatedCarsList;
		});
	}, []);

	const fetchCarsListHandler = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVER_URL}/api/car`,
				{
					crossorigin: true,
					method: "GET",
				}
			);

			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			const carsList = await response.json();

			setCarsList(carsList.cars);
		} catch (error) {
			setError(error.message);
		}

		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchCarsListHandler();
		socket.on("track", (data) => {
			if (data.action === "update") {
				updateCarLocation(data.data);
			}
		});
	}, [fetchCarsListHandler, socket, updateCarLocation]);

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
	});

	return isLoaded ? (
		<GoogleMap
			center={center}
			zoom={10}
			mapContainerStyle={{ width: "100%", height: "100%" }}
			options={{
				streetViewControl: false,
				mapTypeControl: false,
			}}
		>
			{carsList.length > 0 &&
				carsList.map(({ id, last_longitude, last_latitude }) => (
					<Marker
						icon={{
							path: "M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z",
							fillOpacity: 0.9,
							scale: 1,
							strokeWeight: 1,
						}}
						key={id}
						position={{ lat: last_latitude, lng: last_longitude }}
					></Marker>
				))}
		</GoogleMap>
	) : (
		<p>Loading Map</p>
	);
};

export default Map;
