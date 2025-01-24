
export function Header({ openInstructions }){
    return (
        <div className="header-bg-container">
            <div className="header-sub-container">
                <button name="start" type="button" onClick={openInstructions} className="instructions-btn" > Instructions </button>
            </div>
        </div>
    )
}