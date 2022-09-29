import React, { useEffect } from "react";

export interface ToastProps {
  id: string;
  destroy: () => void;
  mode: string;
  title: string;
  content: string;
  duration?: number;
}

const Toast: React.FC<ToastProps> = (props) => {
  const { destroy, mode, content, title, duration = 0, id } = props;

  useEffect(() => {
    if (!duration) return;

    const timer = setTimeout(() => {
      destroy();
    }, duration);

    return () => clearTimeout(timer);
  }, [destroy, duration]);

  return (
    <div className={mode}>
      <div className={"toast-header"}>
        <div>{title}</div>
        <button onClick={destroy}><i className="fa fa-times"></i></button>
      </div>
      <div className={"toast-body"}>{content}</div>
    </div>
  );
};

export default Toast;