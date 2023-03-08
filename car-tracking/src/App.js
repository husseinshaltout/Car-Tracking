import { useState } from "react";

import "./App.css";

import Map from "./components/Map/Map";
import CarsOverview from "./components/CarsOverview/CarsOverview";
import AvgSpeedChart from "./components/Chart/AvgSpeedChart";

import openSocket from "socket.io-client";

function App() {
	const socket = openSocket(process.env.REACT_APP_SERVER_URL);
	const [center, setCenter] = useState({
		lat: 29.989871698356293,
		lng: 31.128345066629592,
	});

	const updateCenterHandler = (newCenter) => {
		setCenter(newCenter);
	};

	return (
		<main>
			<div className="grid-container">
				<div className="map__container">
					<Map socket={socket} mapCenter={center} />
				</div>
				<div className="overview__container">
					<CarsOverview
						socket={socket}
						updateCenter={updateCenterHandler}
						defaultCenter={center}
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
