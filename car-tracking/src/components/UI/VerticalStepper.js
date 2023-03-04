import React from "react";
import classes from "./VerticalStepper.module.css";

function VerticalStepper(props) {
	return (
		<div className={classes["vertical-stepper"]}>
			{props.steps.map((step, index) => (
				<div key={index} className="step">
					<span className={classes.title__container}>
						<span className={classes["step__icon"]}>
							{step.icon}
						</span>
						<h2 className={classes["step__label"]}>{step.label}</h2>
					</span>

					<div className={classes["step__content"]}>
						<p className={classes["step__description"]}>
							{step.description}
						</p>
						<button
							className={classes["step__button"]}
							onClick={step.onClick}
						>
							Track Car
						</button>
					</div>
				</div>
			))}
		</div>
	);
}

export default VerticalStepper;
