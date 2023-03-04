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
const data = [
	{ id: 1, avgSpeed: 60 },
	{ id: 2, avgSpeed: 66 },
	{ id: 3, avgSpeed: 68 },
	{ id: 4, avgSpeed: 88 },
];

const renderBarChart = (
	<ResponsiveContainer width="100%" height={400}>
		<BarChart className={classes.chart} data={data}>
			<XAxis dataKey="id" stroke="#fff" />
			<YAxis stroke="#fff" />
			<Tooltip />
			<CartesianGrid stroke="#fff" strokeDasharray="9 9" />
			<Bar
				dataKey="avgSpeed"
				fill="#fff"
				radius={[10, 10, 10, 10]}
				barSize={15}
			/>
		</BarChart>
	</ResponsiveContainer>
);

const AvgSpeedChart = () => {
	return (
		<Card>
			{renderBarChart}
			<h3>Average Speed</h3>
		</Card>
	);
};
export default AvgSpeedChart;
