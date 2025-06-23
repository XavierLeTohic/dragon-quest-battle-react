import { createContext, useContext, useEffect, useState } from "react";

export const EVENTS_TYPES = {
	BOX: "BOX",
	ACTION_BOX: "ACTION_BOX",
	PLAYER_TURN: "PLAYER_TURN",
	MONSTER_TURN: "MONSTER_TURN",
};

const GameContext = createContext(undefined);

function generateBox(text, action) {
	return { type: EVENTS_TYPES.BOX, id: crypto.randomUUID(), text, action };
}
function generateActionBox(text, actions, intro = false) {
	return {
		type: EVENTS_TYPES.ACTION_BOX,
		id: crypto.randomUUID(),
		text,
		actions,
		intro,
	};
}

export const GameProvider = ({ children }) => {
	const [gameStart, setGameStart] = useState(false);
	const [coreLoop, setCoreLoop] = useState([]);
	const [monstres, setMonstres] = useState([{ name: "Slime", pv: 10 }]);
	const [joueurs, setJoueurs] = useState([
		{ name: "Player 1", pv: 27, mp: 14, id: 1 },
	]);

	console.log("coreLoop", coreLoop);

	const resetGame = () => {
		setGameStart(false);
		setCoreLoop((prevLoop) => {
			prevLoop.splice(0, prevLoop.length);
			return prevLoop;
		});
		setMonstre({ name: "Slime", pv: 10 });
	};

	const onFuite = () => {
		setCoreLoop((prevLoop) => {
			prevLoop.splice(1, 0, generateBox("Vous avez pris la fuite", resetGame));
			return prevLoop;
		});
		next();
	};

	function onFight() {
		next();
	}

	function onAttaque() {
		setCoreLoop((prevLoop) => {
			prevLoop.splice(
				1,
				0,
				generateBox("Le monstre perd 2 PV !", inflictDamage),
			);
			return prevLoop;
		});
		next();
	}

	function inflictDamage() {
		setMonstres((prevMonstres) => {
			const newMonstres = [...prevMonstres];
			newMonstres[0].pv = newMonstres[0].pv - 2;
			return newMonstres;
		});
		next();
	}

	function onPlayerTurn() {
		console.log("player turn");
		setCoreLoop((prevLoop) => {
			prevLoop.splice(
				1,
				0,
				generateActionBox("Actions", [
					{ id: "idAttaque", text: "Attaque", onclick: onAttaque },
					{ id: "idParade", text: "Parade", onclick: () => {} },
					{ id: "idSkills", text: "Skills", onclick: () => {} },
					{ id: "idObjet", text: "Objets", onclick: () => {} },
					{ id: "idFuite", text: "Fuite", onclick: onFuite },
				]),
			);
			return prevLoop;
		});
		next();
	}
	function onMonsterTurn() {
		console.log("monster turn");
	}

	const generateInitialEvents = () => {
		const minEvents = joueurs.length + monstres.length * 2;

		const maxEventsPlayers = joueurs.length * 2;
		const maxEventsMonsters = monstres.length * 2;

		const turns = [
			...Array(maxEventsPlayers).fill({
				type: EVENTS_TYPES.PLAYER_TURN,
				player_id: joueurs[0].id,
			}),
			...Array(maxEventsMonsters).fill({
				type: EVENTS_TYPES.MONSTER_TURN,
				monster_id: monstres[0].id,
			}),
		];

		for (let i = 0; i < turns.length; i++) {
			const j = Math.floor(Math.random() * (i + 1));
			[turns[i], turns[j]] = [turns[j], turns[i]];
		}

		const events = [
			generateActionBox(
				"Des monstres apparaissent !",
				[
					{ id: "id", text: "Combattre", onclick: onFight },
					{ id: "id2", text: "Fuite", onclick: onFuite },
				],
				true,
			),
			...turns,
		];

		setCoreLoop(events);
	};

	useEffect(() => {
		if (gameStart) {
			console.log("Game as starting");

			if (coreLoop.length === 0) {
				generateInitialEvents();
			}
		}
	}, [gameStart]);

	useEffect(() => {
		if (coreLoop?.[0]?.type === EVENTS_TYPES.PLAYER_TURN) {
			onPlayerTurn();
		}
		if (coreLoop?.[0]?.type === EVENTS_TYPES.MONSTER_TURN) {
			onMonsterTurn();
		}
	}, [coreLoop[0]]);

	useEffect(() => {
		if (monstres.every((monstre) => monstre.pv <= 0)) {
			setCoreLoop((prevLoop) => {
				prevLoop.splice(1, 0, generateBox("Victoire", resetGame));
				return prevLoop;
			});
			next();
		}
	}, [monstres]);

	const next = () => {
		if (!gameStart) {
			return;
		}

		setCoreLoop((prevLoop) => {
			const newLoop = prevLoop.slice(1);

			// logique pour ajouter le nombre minimum requis d'events
			if (newLoop.length < 5) {
				const eventsToAdd = 5 - newLoop.length;

				// loop pour ajouter les events
				for (let i = 0; i < eventsToAdd; i++) {
					newLoop.push(generateBox("plus d'événement"));
				}
			}
			return newLoop;
		});
	};

	return (
		<GameContext.Provider
			value={{
				gameStart,
				setGameStart,
				coreLoop,
				setCoreLoop,
				next,
				monstres,
				setMonstres,
				joueurs,
				setJoueurs,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export const useGame = () => {
	const context = useContext(GameContext);

	return context;
};
