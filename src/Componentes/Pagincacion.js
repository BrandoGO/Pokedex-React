import React from "react";

const Paginacion = (props) => {

    const {onLeftClick, onRightClick, page, totalPages} = props;

    return (
        <div className="paginacion">
            <button onClick={onLeftClick}>
                <div>⬅</div>
            </button>
            <div>{page} de {totalPages}</div>
            <button onClick={onRightClick}>
                <div>➡</div>
            </button>
        </div>
    )
}

export default Paginacion;