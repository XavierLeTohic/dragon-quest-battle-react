import "./battle.css";
import { EVENTS_TYPES, useGame } from "../../hooks/useGame";
import DialogBox from "../../components/DialogBox";
import DialogAction from "../../components/DialogAction";
import { Children, useEffect, useState } from "react";
import StatsJoueur from "../../components/StatsJoueur";

function Battle() {
	const { coreLoop, monstres, joueurs } = useGame();
	const [currentEvent, setCurrentEvent] = useState(null);

	useEffect(() => {
		if (coreLoop.length > 0) {
			setCurrentEvent(coreLoop[0]);
		}
	}, [coreLoop]);

	return (
		<div className="battle">
			{monstres && (
				<div className="top-container">
					{joueurs && (
						<div className="etat-joueurs">
							{joueurs.map((joueur) => {
								return (
									<StatsJoueur
										key={joueur.id}
										name={joueur.name}
										pv={joueur.pv}
										mp={joueur.mp}
										id={joueur.id}
									/>
								);
							})}
						</div>
					)}
					<div className="battle-image">
						{monstres.map((monstre) => {
							return (
								<div key={monstre.id}>
									{monstre.name} - {monstre.pv}
								</div>
							);
						})}
					</div>
				</div>
			)}
			{currentEvent && (
				<div className="bot-container">
					{currentEvent.type === EVENTS_TYPES.BOX && (
						<DialogBox
							text={currentEvent.text}
							id={currentEvent.id}
							action={currentEvent.action}
						/>
					)}
					{currentEvent.type === EVENTS_TYPES.ACTION_BOX && (
						<DialogAction
							text={currentEvent.text}
							id={currentEvent.id}
							actions={currentEvent.actions}
							intro={currentEvent.intro}
						/>
					)}
				</div>
			)}
		</div>
	);
}

export default Battle;
