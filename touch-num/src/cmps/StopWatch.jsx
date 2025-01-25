import Timer from "./Timer";

export function StopWatch({ time, kidsMode }) {
    return (
		<>
			{ !kidsMode && (<div className="stop-watch">
				<Timer time={time} />
			</div>)}
		</>
	);
}
