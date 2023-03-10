import { useCallback, useEffect, useState } from "react";

import "./App.css";

import Map from "./components/Map/Map";
import CarsOverview from "./components/CarsOverview/CarsOverview";
import AvgSpeedChart from "./components/Chart/AvgSpeedChart";

import openSocket from "socket.io-client";
import useHttp from "./hooks/useHttp";

function App() {
	const socket = openSocket(process.env.REACT_APP_SERVER_URL);

	const [carsList, setCarsList] = useState([]);
	const [trackedCar, setTrackedCar] = useState(null);
	const [center, setCenter] = useState({
		lat: 29.989871698356293,
		lng: 31.128345066629592,
	});

	const { sendRequest: fetchCarsList } = useHttp();

	const updateTrackedCarHandler = (carId) => {
		setTrackedCar(carId);
	};
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

	useEffect(() => {
		const transformCarList = (carObj) => {
			setCarsList(carObj.cars);
		};

		fetchCarsList(
			{ url: `${process.env.REACT_APP_SERVER_URL}/api/car` },
			transformCarList
		);
		return () => {
			socket.off("track");
		};
	}, [fetchCarsList]);

	useEffect(() => {
		if (trackedCar) {
			const carData = carsList.find((car) => car.id === trackedCar);
			setCenter({
				lat: carData.last_latitude,
				lng: carData.last_longitude,
			});
		}
		socket.on("track", (data) => {
			const isTracked = data.data.id === trackedCar;
			if (data.action === "update") {
				updateCarLocation(data.data);
				if (isTracked) {
					setCenter({
						lat: data.data.last_latitude,
						lng: data.data.last_longitude,
					});
				}
			} else if (data.action === "add") {
				setCarsList((prevCarsList) => [...prevCarsList, data.data]);
			}
		});
		return () => {
			socket.off("track");
		};
	}, [trackedCar, carsList]);

	return (
		<main>
			<div className="grid-container">
				<div className="map__container">
					<Map center={center} carsList={carsList} />
				</div>
				<div className="overview__container">
					<CarsOverview
						updateTrackedCar={updateTrackedCarHandler}
						carsList={carsList}
					/>
				</div>
				<div className="chart__container">
					<AvgSpeedChart carsList={carsList} />
				</div>
			</div>
		</main>
	);
}
export default App;
