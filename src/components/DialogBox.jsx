import { useGame } from "../hooks/useGame";

function DialogBox({ text, id, action }) {
    const {coreLoop, setCoreLoop, next} = useGame();

    return (
        <div key={id} onClick={action} onKeyDown={next} onKeyPress={next} className="dialog-box">
            {text}
        </div>
    );
}

export default DialogBox;