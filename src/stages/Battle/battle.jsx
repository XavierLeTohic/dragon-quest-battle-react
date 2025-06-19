import "./battle.css";
import Action from '../Actions/actions'; 
import { EVENTS_TYPES, useGame } from "../../hooks/useGame";
import DialogBox from "../../components/DialogBox";
import { useEffect, useState } from "react";


function Battle() {
	const {coreLoop} = useGame();
	const [firstEvent, setFirstEvent] = useState(null);

	console.log("rerender", firstEvent);

	useEffect(() => {
		if (coreLoop.length > 0) {
			setFirstEvent(coreLoop[0]);
		}
	}, [coreLoop]);

	return (
		<div className="battle">
			<Action />

			{firstEvent && (
				<div>
					{firstEvent.type === EVENTS_TYPES.BOX && <DialogBox text={firstEvent.item} id={firstEvent.id} />}
				</div>
			)}
		</div>
	);
}

export default Battle;
