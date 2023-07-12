export interface ICustomError {
  data: {
    message: string;
  };
  status: number;
}

export interface ITodo {
  title: string;
  value: string;
}

export interface ITokenWithEmail extends ITodo {
  email: string;
}

export interface ICompletedTodo extends ITodo {
  completed: boolean;
}
