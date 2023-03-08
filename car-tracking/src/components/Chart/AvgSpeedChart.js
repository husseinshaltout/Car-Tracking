import { useCallback, useEffect, useState } from "react";

import classes from "./AvgSpeedChart.module.css";

import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
} from "recharts";
import Card from "../UI/Card";

const renderBarChart = (data) => (
	<ResponsiveContainer width="100%" height={400}>
		<BarChart className={classes.chart} data={data}>
			<XAxis dataKey="plate_number" stroke="#fff" />
			<YAxis stroke="#fff" />
			<Tooltip />
			<CartesianGrid stroke="#fff" strokeDasharray="9 9" />
			<Bar
				dataKey="average_speed"
				fill="#fff"
				radius={[10, 10, 10, 10]}
				barSize={15}
			/>
		</BarChart>
	</ResponsiveContainer>
);

const AvgSpeedChart = ({ socket }) => {
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

	return (
		<Card>
			{renderBarChart(carsList)}
			<h3>Average Speed</h3>
		</Card>
	);
};
export default AvgSpeedChart;
