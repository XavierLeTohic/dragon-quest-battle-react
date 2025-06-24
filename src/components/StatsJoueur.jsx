import { EVENTS_TYPES, useGame } from "../hooks/useGame";

function StatsJoueur({ name, pv, mp, id }) {
	const { coreLoop } = useGame();
	const currentEvent = coreLoop[0];

	return (
		<div
			className={
				(currentEvent?.type === EVENTS_TYPES.ACTION_BOX ||
					currentEvent?.type === EVENTS_TYPES.ATTACK_SELECTION) &&
				currentEvent.player_id === id
					? "joueur-stats player"
					: "joueur-stats"
			}
		>
			<div className="joueur-name">{name}</div>
			<div className="joueur-statut">
				<p>HP {pv} / 27</p>
				<p>MP {mp} / 14</p>
			</div>
		</div>
	);
}

export default StatsJoueur;
