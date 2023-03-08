import React from "react";
import classes from "./VerticalStepper.module.css";
import humanizeDuration from "humanize-duration";

function VerticalStepper(props) {
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
								props.updateCenter({
									lat: step.last_latitude,
									lng: step.last_longitude,
								});
							}}
						>
							{props.center.lat === step.last_latitude &&
							props.center.lng === step.last_longitude
								? "Un Track"
								: "Track Car"}
						</button>
					</div>
				</div>
			))}
		</div>
	);

	function getHumanTime(step) {
		return humanizeDuration(
			Date.now() - new Date(step.updatedAt).getTime(),
			{ round: true }
		);
	}
}

export default VerticalStepper;
