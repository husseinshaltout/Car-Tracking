import { useState } from "react";

import "./App.css";

import Map from "./components/Map/Map";
import CarsOverview from "./components/CarsOverview/CarsOverview";
import AvgSpeedChart from "./components/Chart/AvgSpeedChart";

import openSocket from "socket.io-client";

function App() {
	const socket = openSocket(process.env.REACT_APP_SERVER_URL);

	const [trackedCar, setTrackedCar] = useState(null);

	const updateTrackedCarHandler = (carId) => {
		setTrackedCar(carId);
	};

	return (
		<main>
			<div className="grid-container">
				<div className="map__container">
					<Map socket={socket} trackedCar={trackedCar} />
				</div>
				<div className="overview__container">
					<CarsOverview
						socket={socket}
						updateTrackedCar={updateTrackedCarHandler}
					/>
				</div>
				<div className="chart__container">
					<AvgSpeedChart socket={socket} />
				</div>
			</div>
		</main>
	);
}
export default App;
