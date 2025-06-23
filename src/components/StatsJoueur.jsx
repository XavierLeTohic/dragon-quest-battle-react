function StatsJoueur({name, pv, mp, id}) {
    return (
        <div className="joueur-stats">
            <div className="joueur-name">
                {name}
            </div>
            <div className="joueur-statut">
                {pv}
            </div>
        </div>
    );
}

export default StatsJoueur;