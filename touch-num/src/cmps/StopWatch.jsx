import Timer from "./Timer";

export function StopWatch({ time }) {
    return (
		<div className="stop-watch">
			<Timer time={time} />
		</div>
	);
}
