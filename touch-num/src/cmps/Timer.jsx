import React from "react";
 
export default function Timer({ time }) {
    return (
        <div className="timer">
			<div className="timer-box">
				<span> {("0" + Math.floor((time / 60000) % 60)).slice(-2)}</span>
			</div>
			<div className="colons"> <span> : </span></div>
			<div className="timer-box">
				<span> {("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
			</div>
        </div>
    );
}