import { useState } from "react";
import Modal from "react-modal";

interface IProps {
    isOpen: boolean;
    closeModal: () => void;
    addTodo: (title: string, closeModal: () => void) => void;
}

export const AddTodoModal = ({ isOpen, closeModal, addTodo }: IProps) => {
    const [title, setTitle] = useState("");

    const submit = () => {
        if (title.length === 0) return;

        addTodo(title, closeModal);
    };

    return <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h5>Add A New Todo!</h5>
            <input value={title} onChange={e => setTitle(e.target.value)}
                style={{ padding: "1rem" }}
                placeholder="Todo Title..."
            />
            <button style={{ margin: "1rem" }}
                onClick={submit}
            >Add New Todo!</button>
        </div>
    </Modal>;
};
