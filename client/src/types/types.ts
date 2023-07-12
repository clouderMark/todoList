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
  completed?: boolean;
}

export interface ITodoWithEmail extends ITodo {
  email: string;
}

// export interface ICompletedTodo extends ITodo {
//   completed: boolean;
//   id: string;
// }

// export interface ICompletedEmailedTodo extends ITodo {
//   email: string;
// }
