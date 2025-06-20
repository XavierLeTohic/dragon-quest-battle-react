import { useGame } from "../hooks/useGame";

function DialogAction({ text, id, actions, intro = false }) {
    const {coreLoop, setCoreLoop, next} = useGame();

    return (
        <div key={id} className="dialog-action">
            <div className="dialog-text">
                {text}
            </div>
            <div className={intro ? "action-buttons intro" : "action-buttons" }>
                {actions.map((action) => {
                    return (
                    <button key={action.id} type="button" onClick={action.onclick}>
                        {action.text}
                    </button>);
                })}
            </div>
        </div>
    );
}

export default DialogAction;