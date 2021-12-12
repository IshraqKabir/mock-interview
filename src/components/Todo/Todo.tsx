import { CSSProperties, useState } from "react";
import ITodo from "../../types/ITodo";
import { TodoDetail } from "../TodoDetail/TodoDetail";

interface IProps {
    todo: ITodo;
    deleteTodo: (todo: ITodo) => void;
    editTodo: (todoId: number, title: string) => void;
}

const todoContainerStyle: CSSProperties = {
    padding: "1rem 1rem",
    margin: "1rem",
    border: "1px solid gray",
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
};

export const buttonStyle: CSSProperties = {
    padding: "0.5rem 1rem",
    backgroundColor: "lightgray",
};

export const Todo = ({ todo, deleteTodo, editTodo }: IProps) => {
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const showModal = () => setIsDetailModalOpen(true);
    const closeModal = () => setIsDetailModalOpen(false);

    return <div style={todoContainerStyle}>
        <div style={{ fontWeight: "bold", cursor: "pointer" }} onClick={showModal}>{todo.title}</div>
        <div style={{ marginLeft: "auto", marginRight: "2rem", ...buttonStyle }} onClick={showModal}>Edit</div>
        <div style={{ ...buttonStyle, backgroundColor: "red", color: "white" }}
            onClick={() => deleteTodo(todo)}
        >Delete</div>
        <TodoDetail todo={todo} isOpen={isDetailModalOpen} closeModal={closeModal} editTodo={editTodo} />
    </div >;
};
