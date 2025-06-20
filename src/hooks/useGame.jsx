import { createContext, useContext, useEffect, useState } from "react";

export const EVENTS_TYPES = {BOX: "BOX", ACTION_BOX: "ACTION_BOX"};

const GameContext = createContext(undefined);

function generateBox(text, action) {
    return {type: EVENTS_TYPES.BOX, id: crypto.randomUUID(), text, action};
}
function generateActionBox(text, actions, intro = false) {
    return {type: EVENTS_TYPES.ACTION_BOX, id: crypto.randomUUID(), text, actions, intro};
}

export const GameProvider = ({ children }) => {
    const [gameStart, setGameStart] = useState(false);
    const [coreLoop, setCoreLoop] = useState([]);
    const [monstre, setMonstre] = useState({name: "Slime", pv: 10});
    const [joueur, setJoueur] = useState(
        {name: "Player 1", pv: 27, mp: 14},
        {name: "Player 2", pv: 17, mp: 24},
    );

    console.log("coreLoop", coreLoop);

    const resetGame = () => {
        setGameStart(false);
        setCoreLoop((prevLoop) => {
            prevLoop.splice(0, prevLoop.length);
            return prevLoop;
        });
        setMonstre({name: "Slime", pv: 10});
    }

    const onFuite = () => {
        setCoreLoop((prevLoop) => {
            prevLoop.splice(1, 0, generateBox("Vous avez pris la fuite", resetGame));
            return prevLoop;
        });
        next();
    };

    function onAction() {
        setCoreLoop((prevLoop) => {
            prevLoop.splice(1, 0, generateActionBox("Actions", [
                {id: "idAttaque", text: "Attaque", onclick: onAttaque},
                {id: "idParade", text: "Parade", onclick: () => {}},
                {id: "idSkills", text: "Skills", onclick: () => {}},
                {id: "idObjet", text: "Objets", onclick: () => {}},
                {id: "idFuite", text: "Fuite", onclick: onFuite},
            ]));
            return prevLoop;
        });
        next();
    }

    function onAttaque() {
        setCoreLoop((prevLoop) => {
            prevLoop.splice(
                1,
                0, 
                generateBox("Le monstre perd 2 PV !", inflictDamage), 
                generateActionBox("Faite un choix", [
                    {id: "idAttaque", text: "Attaque", onclick: onAttaque},
                    {id: "idParade", text: "Parade", onclick: () => {}},
                    {id: "idSkills", text: "Skills", onclick: () => {}},
                    {id: "idObjet", text: "Objets", onclick: () => {}},
                    {id: "idFuite", text: "Fuite", onclick: onFuite},
                ])
            );
            return prevLoop;
        });
        next();
    }

    function inflictDamage() {
        setMonstre((prevMonstre) => {
            const newMonstre = {...prevMonstre};
            newMonstre.pv = newMonstre.pv - 2;
            return newMonstre;
        });
        next();
    }

    const generateInitialActions = () => { 
        const events = [
            generateActionBox("Des monstres apparaissent !", [
                {id: "id", text: "Combattre", onclick: onAction},
                {id: "id2", text: "Fuite", onclick: onFuite},
            ], true),
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

    useEffect(() => {
        if (monstre.pv <= 0) {
            setCoreLoop((prevLoop) => {
                prevLoop.splice(1, 0, generateBox("Victoire", resetGame));
                return prevLoop;
            });
            next();
        }
    }, [monstre]);

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