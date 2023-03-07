import { useCallback, useEffect, useState } from "react";
import openSocket from "socket.io-client";

import classes from "./CarsOverview.module.css";

import Card from "../UI/Card";
import SearchBox from "../UI/SearchBox";
import VerticalStepper from "../UI/VerticalStepper";
import CarIcon from "../UI/CarIcon";

const CarsOverview = () => {
	const steps = [
		{ icon: <CarIcon />, label: "abc123", description: "Was not updated" },
		{
			icon: <CarIcon />,
			label: "xyz987",
			description: "Last updated 9 minutes ago",
		},
	];
	const [carsList, setCarsList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchCarsListHandler = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch("http://127.0.0.1:8000/api/car", {
				crossorigin: true,
				method: "GET",
			});

			if (!response.ok) {
				throw new Error("Something went wrong!");
			}

			const carsList = await response.json();

			setCarsList(carsList.cars);
		} catch (error) {
			setError(error.message);
		}

		setIsLoading(false);
		openSocket("http://127.0.0.1:8000/");
	}, []);

	useEffect(() => {
		fetchCarsListHandler();
	}, [fetchCarsListHandler]);

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
			<VerticalStepper steps={availableCars} icon={<CarIcon />} />
		</Card>
	);
};

export default CarsOverview;
