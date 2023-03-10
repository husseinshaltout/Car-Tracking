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

const AvgSpeedChart = ({ carsList }) => {
	return (
		<Card>
			{renderBarChart(carsList)}
			<h3>Average Speed</h3>
		</Card>
	);
};
export default AvgSpeedChart;
