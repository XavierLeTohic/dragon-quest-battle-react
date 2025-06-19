import { createContext, useContext, useEffect, useState } from "react";

export const EVENTS_TYPES = {BOX: "BOX"};

const GameContext = createContext(undefined);

function generateBox(item) {
    return {type: EVENTS_TYPES.BOX, id: crypto.randomUUID(), item };
}

export const GameProvider = ({ children }) => {
    const [gameStart, setGameStart] = useState(false);
    const [coreLoop, setCoreLoop] = useState([]);

    console.log("coreLoop", coreLoop);

    const generateInitialActions = () => { 
        const actions = [
            "Monstre 1 attaque",
            "Joueur 1 attaque",
            "Monstre 2 attaque",
            "Joueur 2 attaque",
            "Joueur 3 attaque"
        ].map((item) => {
            return generateBox(item);
        });
        setCoreLoop(actions);
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

        const loop = coreLoop;
        loop.slice(1);


        console.log('new loop', loop);

        setCoreLoop(loop);
    }

	return <GameContext.Provider value={{gameStart, setGameStart, coreLoop, setCoreLoop, next}}>{children}</GameContext.Provider>;
}

export const useGame = () => {
    const context = useContext(GameContext);

    return context;
}