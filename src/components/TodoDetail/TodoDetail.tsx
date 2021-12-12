import ITodo from "../../types/ITodo";
import Modal from "react-modal";
import { useState } from "react";

interface IProps {
    todo: ITodo;
    isOpen: boolean;
    closeModal: () => void;
    editTodo: (todoId: number, title: string) => void;
}

export const TodoDetail = ({ todo, isOpen, closeModal, editTodo }: IProps) => {
    const [title, setTitle] = useState(todo.title);

    const submit = () => {
        if (title.length === 0) return;

        editTodo(todo.id, title);
    };

    return <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h3 style={{ margin: "1rem" }}>Edit This Todo</h3>
            <div style={{ margin: "1rem" }}>Current Title: <b>{todo.title}</b></div>
            <input value={title} onChange={e => setTitle(e.target.value)}
                style={{ padding: "1rem" }}
            />
            <button style={{ margin: "1rem" }}
                onClick={submit}
            >Edit</button>
        </div>
    </Modal>;
};
