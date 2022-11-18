import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = (props) => {
  return (
    <div className="grocery-list">
      {props.items.map((item) => {
        const { id, title } = item;

        return (
          <article key={id} className="grocery-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button type="button" className="edit-btn" onClick={()=>props.editItem(id)}>
                <FaEdit />
              </button>
              <button type="button" className="delete-btn" onClick={()=>props.removeList(id)}>
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
