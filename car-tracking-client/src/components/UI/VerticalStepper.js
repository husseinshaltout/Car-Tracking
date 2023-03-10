import React from "react";
import classes from "./VerticalStepper.module.css";
import humanizeDuration from "humanize-duration";

function VerticalStepper(props) {
	const onClickHandler = (step) => {
		if (step.id === props.trackedCar) {
			props.updateTrackedCar(null);
		} else {
			props.updateTrackedCar(step.id);
		}
	};
	function getHumanTime(step) {
		return humanizeDuration(
			Date.now() - new Date(step.updatedAt).getTime(),
			{ round: true }
		);
	}

	return (
		<div className={classes["vertical-stepper"]}>
			{props.steps.map((step) => (
				<div key={step.id} className="step">
					<span className={classes.title__container}>
						<span className={classes["step__icon"]}>
							{props.icon}
						</span>
						<h2 className={classes["step__label"]}>
							{step.plate_number}
						</h2>
					</span>

					<div className={classes["step__content"]}>
						<p className={classes["step__description"]}>
							Last updated {getHumanTime(step)} ago.
						</p>

						<button
							className={classes["step__button"]}
							onClick={() => {
								onClickHandler(step);
							}}
						>
							{step.id === props.trackedCar
								? "Un Track"
								: "Track Car"}
						</button>
					</div>
				</div>
			))}
		</div>
	);
}

export default VerticalStepper;
