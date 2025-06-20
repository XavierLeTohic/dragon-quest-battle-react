import { createContext, useContext, useEffect, useState } from "react";

export const EVENTS_TYPES = {BOX: "BOX", ACTION_BOX: "ACTION_BOX"};

const GameContext = createContext(undefined);

function generateBox(text) {
    return {type: EVENTS_TYPES.BOX, id: crypto.randomUUID(), text };
}
function generateActionBox(text, actions) {
    return {type: EVENTS_TYPES.ACTION_BOX, id: crypto.randomUUID(), text, actions};
}

export const GameProvider = ({ children }) => {
    const [gameStart, setGameStart] = useState(false);
    const [coreLoop, setCoreLoop] = useState([]);

    console.log("coreLoop", coreLoop);

    const resetGame = () => {
        setGameStart(false);
        setCoreLoop((prevLoop) => {
            prevLoop.splice(0, prevLoop.length);
            return prevLoop;
        });
    }

    const onFuite = () => {
        resetGame();  
    };

    const generateInitialActions = () => { 
        const events = [
            generateBox("Des monstres apparaissent !"),
            generateActionBox("Que voulez-vous faire ?", [
                {id: "id", text: "Attaque", onclick: ()=> {}},
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

	return <GameContext.Provider value={{gameStart, setGameStart, coreLoop, setCoreLoop, next}}>{children}</GameContext.Provider>;
}

export const useGame = () => {
    const context = useContext(GameContext);

    return context;
}