import { useGame } from "../hooks/useGame";

function DialogBox({ text, id }) {
    const {coreLoop, setCoreLoop, next} = useGame();

    return (
        <div key={id} style={{backgroundColor: "rgb(23, 16, 12", color: "white"}} onClick={() => next()} onKeyDown={next} onKeyPress={next}>
            {text}
        </div>
    );
}

export default DialogBox;