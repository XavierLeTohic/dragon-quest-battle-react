import "./battle.css";
import { EVENTS_TYPES, useGame } from "../../hooks/useGame";
import DialogBox from "../../components/DialogBox";
import DialogAction from "../../components/DialogAction";
import { Children, useEffect, useState } from "react";

function Battle() {
	const {coreLoop, monstre, joueur} = useGame();
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
				<div className="top-container">
					{joueur && (
						<div className="etat-joueurs">
							{joueur.name}
							{joueur.pv}
							{joueur.mp}
						</div>
					)}
					<div className="battle-image"> 
						
					</div>
			
					{monstre.name}
					{monstre.pv}
				</div>
			)}
			{currentEvent && (
				<div className="bot-container">
					{currentEvent.type === EVENTS_TYPES.BOX && <DialogBox text={currentEvent.text} id={currentEvent.id} action={currentEvent.action} />}
					{currentEvent.type === EVENTS_TYPES.ACTION_BOX && <DialogAction text={currentEvent.text} id={currentEvent.id} actions={currentEvent.actions} intro={currentEvent.intro} />}
				</div>
			)}
		</div>
	);
}

export default Battle;
