import { useGame } from "../../hooks/useGame";

function Action() {
    const {setGameStart} = useGame();
    return <button type="button" onClick={() => setGameStart(false)}>fuite</button>
}

export default Action;