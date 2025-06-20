import { createContext, useContext, useEffect, useState } from "react";

export const EVENTS_TYPES = {BOX: "BOX", ACTION_BOX: "ACTION_BOX"};

const GameContext = createContext(undefined);

function generateBox(text, action) {
    return {type: EVENTS_TYPES.BOX, id: crypto.randomUUID(), text, action};
}
function generateActionBox(text, actions) {
    return {type: EVENTS_TYPES.ACTION_BOX, id: crypto.randomUUID(), text, actions};
}

export const GameProvider = ({ children }) => {
    const [gameStart, setGameStart] = useState(false);
    const [coreLoop, setCoreLoop] = useState([]);
    const [monstre, setMonstre] = useState({name: "Slime", pv: 10});
    const [joueur, setJoueur] = useState({name: "Player 1", pv: 10, degats: 2});

    console.log("coreLoop", coreLoop);

    const resetGame = () => {
        setGameStart(false);
        setCoreLoop((prevLoop) => {
            prevLoop.splice(0, prevLoop.length);
            return prevLoop;
        });
    }

    const onFuite = () => {
        setCoreLoop((prevLoop) => {
            prevLoop.splice(1, 0, generateBox("Fuite", resetGame));
            return prevLoop;
        });
        next();
    };

    function onAction() {
        setCoreLoop((prevLoop) => {
            prevLoop.splice(1, 0, generateActionBox("Faite un choix", [
                {id: "idAttaque", text: "Attaque", onclick: onAttaque},
                {id: "idParade", text: "Parade", onclick: () => {}},
                {id: "idFuite", text: "Fuite", onclick: onFuite},
            ]));
            return prevLoop;
        });
        next();
    }

    function onAttaque() {
        setMonstre((prevMonster) => {
            const newMonster = {...prevMonster}
            newMonster.pv = prevMonster.pv - 2;
            return newMonster;
        });
        console.log(monstre);
        if (monstre.pv <= 0) {
            setCoreLoop((prevLoop) => {
                prevLoop.splice(1, 0, generateBox("Victoire", resetGame));
                return prevLoop;
            });
            next();
        }
    }

    const generateInitialActions = () => { 
        const events = [
            generateBox("Des monstres apparaissent !", next),
            generateActionBox("Que voulez-vous faire ?", [
                {id: "id", text: "Combattre", onclick: onAction},
                {id: "id2", text: "Fuite", onclick: onFuite},
            ]),
        ];
        setCoreLoop(events);
    };
    
    useEffect(() => {
        if (gameStart) {
            console.log("Game as starting");
            
            if (coreLoop.length === 0) {
                generateInitialActions();
            }
        }
    }, [gameStart]);

    const next = () => {
        if (!gameStart) {
            return;
        }

        setCoreLoop((prevLoop) => {
			const newLoop = prevLoop.slice(1);

			// logique pour ajouter le nombre minimum requis d'events
			if(newLoop.length < 5) {
				const eventsToAdd = 5 - newLoop.length; 

				// loop pour ajouter les events
                for (let i = 0 ; i < eventsToAdd ; i++) {
                    newLoop.push(generateBox("plus d'événement"));
                }
			}
			return newLoop;
		});
    }

	return <GameContext.Provider value={{gameStart, setGameStart, coreLoop, setCoreLoop, next, monstre, setMonstre, joueur, setJoueur}}>{children}</GameContext.Provider>;
}

export const useGame = () => {
    const context = useContext(GameContext);

    return context;
}