import axios from "axios";
import { useEffect, useState } from "react";
import { AddTodo } from "../../components/AddTodo/AddTodo";
import { Todo } from "../../components/Todo/Todo";
import ITodo from "../../types/ITodo";

const getTodosFromLocalStorage = (): ITodo[] => {
    return JSON.parse(localStorage.getItem("todos") ?? "[]");
};

export const TodoList = () => {
    const [todos, setTodos] = useState<ITodo[]>(getTodosFromLocalStorage());

    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    }, [todos.length]);

    useEffect(() => {
        if (todos.length < 1)
            axios.get('https://jsonplaceholder.typicode.com/todos')
                .then(response => {
                    setTodos(response.data as ITodo[]);
                });
    }, []);

    const deleteTodo = (todo: ITodo) => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
            .then(() => {
                setTodos(todos => todos.filter(_todo => _todo.id !== todo.id));
                alert(`${todo.title} deleted!`);
            }).catch(err => console.log(err));
    };

    const addTodo = (title: string, closeModal: () => void) => {
        axios.post(`https://jsonplaceholder.typicode.com/todos`)
            .then(response => {
                const { id } = response.data as { id: number; };

                setTodos(_todos => {
                    return [
                        {
                            id, title
                        },
                        ...todos,
                    ];
                });

                alert("Todo added!");

                closeModal();

                console.log(response.data);
            }).catch(err => console.log(err));
    };

    const editTodo = (todoId: number, title: string) => {
        axios.put(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
            .then(response => {
                alert("Editted!");
                setTodos(todos => todos.map(_todo => {
                    if (_todo.id !== todoId) return _todo;

                    return {
                        ..._todo,
                        title: title,
                    };
                }));
            }).catch(err => {
                alert("Editted!");
                setTodos(todos => todos.map(_todo => {
                    if (_todo.id !== todoId) return _todo;

                    return {
                        ..._todo,
                        title: title,
                    };
                }));
            });
    };

    return <div>
        <div style={{ textAlign: "center", margin: "1rem" }}>Todo List</div>
        <AddTodo addTodo={addTodo} />
        {todos.map((todo, _i) => {
            return <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} editTodo={editTodo} />;
        })}
    </div>;
};
