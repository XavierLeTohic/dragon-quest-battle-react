import { createContext, useContext, useEffect, useState } from "react";

export const EVENTS_TYPES = {
	BOX: "BOX",
	ACTION_BOX: "ACTION_BOX",
	PLAYER_TURN: "PLAYER_TURN",
	MONSTER_TURN: "MONSTER_TURN",
	END_TURN: "END_TURN",
	ATTACK_SELECTION: "ATTACK_SELECTION",
};

const DEFAULT_MONSTRES = [
	{ name: "Bunicorn", pv: 10, id: 1, imgUrl: "monsters/Bunicorn.png" },
	{ name: "Slime", pv: 7, id: 2, imgUrl: "monsters/Slime.png" },
	{ name: "Deadnaut", pv: 12, id: 3, imgUrl: "monsters/Deadnaut.png" },
];

const GameContext = createContext(undefined);

function generateBox(text, action) {
	return { type: EVENTS_TYPES.BOX, id: crypto.randomUUID(), text, action };
}
function generateActionBox(text, actions, options = {}) {
	return {
		type: EVENTS_TYPES.ACTION_BOX,
		id: crypto.randomUUID(),
		text,
		actions,
		...options,
	};
}
function generateMonsters() {
	const nbMonsters = Math.floor(Math.random() * 5) + 1;
	const monsters = [];

	for (let i = 0; i < nbMonsters; i++) {
		const idMonster = Math.floor(Math.random() * 3) + 1;
		const selectedMonster = DEFAULT_MONSTRES.find(
			(monster) => monster.id === idMonster,
		);

		if (selectedMonster) {
			monsters.push({
				...selectedMonster,
				id: crypto.randomUUID(),
			});
		}
	}
	return monsters;
}

export const GameProvider = ({ children }) => {
	const [gameReady, setGameReady] = useState(false);
	const [gameStart, setGameStart] = useState(false);
	const [coreLoop, setCoreLoop] = useState([]);
	const [monstres, setMonstres] = useState([]);
	const [joueurs, setJoueurs] = useState([
		{ name: "Héro", pv: 27, mp: 20, id: 1 },
		{ name: "Erik", pv: 24, mp: 14, id: 2 },
		{ name: "Véronica", pv: 20, mp: 24, id: 3 },
	]);

	console.log("coreLoop", coreLoop);

	const resetGame = () => {
		setGameReady(false);
		setGameStart(false);
		setCoreLoop((prevLoop) => {
			prevLoop.splice(0, prevLoop.length);
			return prevLoop;
		});
		setMonstres([]);
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

	function onAttaque(player_id) {
		setCoreLoop((prevLoop) => {
			prevLoop.splice(1, 0, { type: EVENTS_TYPES.ATTACK_SELECTION, player_id });
			return prevLoop;
		});
		next();
	}

	function inflictDamageMonster(player_id, monster_id, monster_name) {
		const player = joueurs.find((joueur) => joueur.id === player_id);
		setCoreLoop((prevLoop) => {
			prevLoop.splice(
				1,
				0,
				generateBox(`${player.name} attack ${monster_name}`, () => {
					setMonstres((prevMonstres) => {
						const newMonstres = [...prevMonstres];
						for (let i = 0; i < newMonstres.length; i++) {
							if (newMonstres[i].id === monster_id) {
								newMonstres[i] = {
									...newMonstres[i],
									pv: newMonstres[i].pv - 15,
								};
								break;
							}
						}
						return newMonstres;
					});
					next();
				}),
			);
			return prevLoop;
		});
		next();
	}
	function inflictDamagePlayer() {
		setJoueurs((prevJoueurs) => {
			const newJoueurs = [...prevJoueurs];
			newJoueurs[0].pv = newJoueurs[0].pv - 1;
			return newJoueurs;
		});
		next();
	}

	function onPlayerTurn(player_id) {
		const player = joueurs.find((joueur) => joueur.id === player_id);
		setCoreLoop((prevLoop) => {
			prevLoop.splice(
				1,
				0,
				generateActionBox(
					player.name,
					[
						{
							id: "idAttaque",
							text: "Attaque",
							onclick: () => onAttaque(player_id),
						},
						{ id: "idParade", text: "Parade", onclick: () => {} },
						{ id: "idSkills", text: "Skills", onclick: () => {} },
						{ id: "idObjet", text: "Objets", onclick: () => {} },
						{ id: "idFuite", text: "Fuite", onclick: onFuite },
					],
					{ player_id },
				),
			);
			return prevLoop;
		});
		next();
	}
	function onMonsterTurn() {
		console.log("monster turn");
		setCoreLoop((prevLoop) => {
			prevLoop.splice(
				1,
				0,
				generateBox("Le monstre vous inflige 2 dégats", inflictDamagePlayer),
			);
			return prevLoop;
		});
		next();
	}

	const generateInitialEvents = () => {
		const initialMonsters = generateMonsters();
		setMonstres(initialMonsters);
		const turns = generateTurns();

		const events = [
			generateActionBox(
				"Des monstres apparaissent !",
				[
					{ id: "id", text: "Combattre", onclick: onFight },
					{ id: "id2", text: "Fuite", onclick: onFuite },
				],
				{ intro: true },
			),
			...turns,
		];

		setCoreLoop(events);
		setGameReady(true);
	};

	function generateTurns() {
		const turns = [
			...joueurs.flatMap((joueur) =>
				Array(1).fill({
					type: EVENTS_TYPES.PLAYER_TURN,
					player_id: joueur.id,
				}),
			),
			...monstres.flatMap((monstre) =>
				Array(1).fill({
					type: EVENTS_TYPES.MONSTER_TURN,
					monster_id: monstre.id,
				}),
			),
		];

		const playerTurns = turns.filter(
			(turn) => turn.type === EVENTS_TYPES.PLAYER_TURN,
		);
		const monsterTurns = turns.filter(
			(turn) => turn.type === EVENTS_TYPES.MONSTER_TURN,
		);

		for (let i = playerTurns.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[playerTurns[i], playerTurns[j]] = [playerTurns[j], playerTurns[i]];
		}
		for (let i = monsterTurns.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[monsterTurns[i], monsterTurns[j]] = [monsterTurns[j], monsterTurns[i]];
		}

		const interleavedTurns = [];
		let i = 0;
		let j = 0;
		while (i < playerTurns.length || j < monsterTurns.length) {
			if (i < playerTurns.length) {
				interleavedTurns.push(playerTurns[i]);
				i++;
			}
			if (j < monsterTurns.length) {
				interleavedTurns.push(monsterTurns[j]);
				j++;
			}
		}

		interleavedTurns.push({ type: EVENTS_TYPES.END_TURN });

		return interleavedTurns;
	}

	useEffect(() => {
		if (gameStart) {
			console.log("Game as starting");

			if (coreLoop.length === 0) {
				generateInitialEvents();
			}
		}
	}, [gameStart]);

	useEffect(() => {
		const event = coreLoop?.[0];
		if (event?.type === EVENTS_TYPES.PLAYER_TURN) {
			onPlayerTurn(event.player_id);
		}
		if (event?.type === EVENTS_TYPES.MONSTER_TURN) {
			onMonsterTurn();
		}
		if (event?.type === EVENTS_TYPES.END_TURN) {
			const events = generateTurns();
			setCoreLoop((prevLoop) => {
				prevLoop.splice(1, 0, ...events);
				return prevLoop;
			});
			next();
		}
	}, [coreLoop[0]]);

	useEffect(() => {
		if (!gameStart && !gameReady) {
			return;
		}
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
				inflictDamageMonster,
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
