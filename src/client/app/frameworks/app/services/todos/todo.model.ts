export interface AppState {
    Todos: Todo[];
    VisibilityFilter: any;
}

export interface Todo {
    id: string;
    text: string;
    complete: boolean;
}

export interface TodoModel {
    filteredTodos: Todo[];
    totalTodos: number;
    completedTodos: number;
}
