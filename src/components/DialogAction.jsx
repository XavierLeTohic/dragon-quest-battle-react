import { useGame } from "../hooks/useGame";

function DialogBox({ text, id, actions }) {
    const {coreLoop, setCoreLoop, next} = useGame();

    return (
        <div key={id} style={{backgroundColor: "rgb(23, 16, 12", color: "white"}}>
            {text}
            {actions.map((action) => {
                return (
                <button key={action.id} type="button" onClick={action.onclick}>
                    {action.text}
                </button>);
            })}
        </div>
    );
}

export default DialogBox;