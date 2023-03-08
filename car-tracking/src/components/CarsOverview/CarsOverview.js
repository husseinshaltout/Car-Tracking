import { useCallback, useEffect, useState } from "react";

import classes from "./CarsOverview.module.css";

import Card from "../UI/Card";
import SearchBox from "../UI/SearchBox";
import VerticalStepper from "../UI/VerticalStepper";
import CarIcon from "../UI/CarIcon";

const CarsOverview = ({ socket }) => {
	const [carsList, setCarsList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [center, setCenter] = useState(null);

	const updateCenterHandler = (newCenter) => {
		setCenter(newCenter);
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
				updateCenter={updateCenterHandler}
				center={center}
			/>
		</Card>
	);
};

export default CarsOverview;
