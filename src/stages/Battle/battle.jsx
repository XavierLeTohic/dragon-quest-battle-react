import "./battle.css";
import { EVENTS_TYPES, useGame } from "../../hooks/useGame";
import DialogBox from "../../components/DialogBox";
import DialogAction from "../../components/DialogAction";
import { useEffect, useState } from "react";


function Battle() {
	const {coreLoop, monstre} = useGame();
	const [currentEvent, setCurrentEvent] = useState(null);

	console.log("rerender", currentEvent);

	useEffect(() => {
		if (coreLoop.length > 0) {
			setCurrentEvent(coreLoop[0]);
		}
	}, [coreLoop]);

	return (
		<div className="battle">
			{monstre && (
				<div style={{backgroundColor: "white"}}>
					{monstre.name}
					{monstre.pv}
				</div>
			)}
			{currentEvent && (
				<div>
					{currentEvent.type === EVENTS_TYPES.BOX && <DialogBox text={currentEvent.text} id={currentEvent.id} action={currentEvent.action} />}
					{currentEvent.type === EVENTS_TYPES.ACTION_BOX && <DialogAction text={currentEvent.text} id={currentEvent.id} actions={currentEvent.actions} />}
				</div>
			)}
		</div>
	);
}

export default Battle;
