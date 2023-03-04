import "./App.css";
import Map from "./components/Map/Map";

import CarsOverview from "./components/CarsOverview/CarsOverview";
import AvgSpeedChart from "./components/Chart/AvgSpeedChart";

function App() {
	return (
		<main>
			<div className="grid-container">
				<div className="map__container">
					<Map />
				</div>
				<div className="overview__container">
					<CarsOverview />
				</div>
				<div className="chart__container">
					<AvgSpeedChart />
				</div>
			</div>
		</main>
	);
}
export default App;
