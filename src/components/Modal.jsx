import React from "react";
import cl from "./Modal.module.css";

const Modal = ({ children, visible, changeVisibility }) => {
  const rootClasses = [cl.modal];
  if (visible) {
    rootClasses.push(cl.active);
    document.body.classList.add("modal-open");
  } else {
    document.body.classList.remove("modal-open");
  }

  return (
    <div className={rootClasses.join(" ")} onClick={changeVisibility}>
      <div className={cl.modal_content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
