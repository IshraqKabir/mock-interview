import { useState } from "react";
import { AddTodoModal } from "./AddTodoModal/AddTodoModal";

interface IProps {
    addTodo: (title: string, closeModal: () => void) => void;
}

export const AddTodo = ({ addTodo }: IProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <button onClick={openModal} style={{ cursor: "pointer" }}>Add New Todo!</button>
        <AddTodoModal isOpen={isOpen} closeModal={closeModal} addTodo={addTodo} />
    </div>;
};

