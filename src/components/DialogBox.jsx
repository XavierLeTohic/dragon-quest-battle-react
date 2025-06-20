import { useGame } from "../hooks/useGame";

function DialogBox({ text, id, action }) {
    const {coreLoop, setCoreLoop, next} = useGame();

    return (
        <div key={id} style={{backgroundColor: "rgb(23, 16, 12", color: "white"}} onClick={action} onKeyDown={next} onKeyPress={next}>
            {text}
        </div>
    );
}

export default DialogBox;