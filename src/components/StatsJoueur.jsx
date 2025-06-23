function StatsJoueur({ name, pv, mp, id }) {
	return (
		<div className="joueur-stats">
			<div className="joueur-name">{name}</div>
			<div className="joueur-statut">
				<p>HP {pv} / 27</p>
				<p>MP {mp} / 14</p>
			</div>
		</div>
	);
}

export default StatsJoueur;
