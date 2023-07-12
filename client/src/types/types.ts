export interface ICustomError {
  data: {
    message: string;
  };
  status: number;
}

export interface ITodo {
  title: string;
  value: string;
  id?: string;
}

export interface ITodoWithEmail extends ITodo {
  email: string;
}

export interface ICompletedTodo extends ITodo {
  completed: boolean;
  id: string;
}
