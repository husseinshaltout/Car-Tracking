import { useState } from "react";

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

	const [query, setQuery] = useState("");

	const onSearchHandler = (query) => {
		setQuery(query);
	};

	const availableCars = steps.filter((car) => {
		if (query === "") {
			return car;
		} else if (car.label.toLowerCase().includes(query.toLowerCase())) {
			return car;
		}
	});

	return (
		<Card className={classes["overview"]}>
			<h4>Cars Overview</h4>
			<SearchBox onSearch={onSearchHandler} />
			<VerticalStepper steps={availableCars} />
		</Card>
	);
};

export default CarsOverview;
