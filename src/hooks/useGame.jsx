import { createContext, useContext, useEffect, useState } from "react";

const GameContext = createContext(undefined);

export const GameProvider = ({ children }) => {
    const [gameStart, setGameStart] = useState(false);
    useEffect(() => {
        if (gameStart) {
            console.log("Game as starting");
        }
    }, [gameStart]);

	return <GameContext.Provider value={{gameStart, setGameStart}}>{children}</GameContext.Provider>;
}

export const useGame = () => {
    const context = useContext(GameContext);

    return context;
}