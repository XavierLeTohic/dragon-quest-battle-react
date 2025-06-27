import { useState } from "react";
import { useGame } from "../hooks/useGame";

function DialogAction({ text, id, actions, intro = false }) {
	const { coreLoop, setCoreLoop, next } = useGame();
	const [diplaySubaction, setDisplaySubAction] = useState(false);
	const [subActions, setSubActions] = useState([]);

	function onClick(action) {
		if (action.onclick && !action.actions) {
			action.onclick();
			return;
		}
		setDisplaySubAction(true);
		setSubActions(action.actions);
	}

	return (
		<>
			<div key={id} className="dialog-action">
				<div className="dialog-text">{text}</div>
				<div className={intro ? "action-buttons intro" : "action-buttons"}>
					{actions.map((action) => {
						return (
							<button
								key={action.id}
								type="button"
								onClick={() => onClick(action)}
							>
								{action.text}
							</button>
						);
					})}
				</div>
			</div>
			{diplaySubaction && (
				<div className="dialog-sub-action">
					<div className="action-buttons">
						{subActions.map((action) => {
							return (
								<button key={action.id} type="button" onClick={action.onclick}>
									{action.text}
								</button>
							);
						})}
					</div>
				</div>
			)}
		</>
	);
}

export default DialogAction;
