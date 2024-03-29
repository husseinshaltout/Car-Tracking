import { useState } from "react";

import classes from "./CarsOverview.module.css";

import Card from "../UI/Card";
import SearchBox from "../UI/SearchBox";
import VerticalStepper from "../UI/VerticalStepper";
import CarIcon from "../UI/CarIcon";

const CarsOverview = ({ updateTrackedCar, carsList }) => {
	const [trackedCar, setTrackedCar] = useState(null);

	const updateTrackedCarHandler = (carId) => {
		setTrackedCar(carId);
		updateTrackedCar(carId);
	};

	const [query, setQuery] = useState("");

	const onSearchHandler = (query) => {
		setQuery(query);
	};

	const availableCars = carsList.filter((car) => {
		if (query === "") {
			return car;
		} else if (
			car.plate_number.toLowerCase().includes(query.toLowerCase())
		) {
			return car;
		}
	});

	return (
		<Card className={classes["overview"]}>
			<h4>Cars Overview</h4>
			<SearchBox onSearch={onSearchHandler} />
			<VerticalStepper
				steps={availableCars}
				icon={<CarIcon />}
				updateTrackedCar={updateTrackedCarHandler}
				trackedCar={trackedCar ?? ""}
			/>
		</Card>
	);
};

export default CarsOverview;
