import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from './board';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private baseUrl = 'http://localhost:8080/boards';

  constructor(private http: HttpClient) { }

  getAllBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.baseUrl);
  }

  getBoardById(id: number): Observable<Board> {
    return this.http.get<Board>(`${this.baseUrl}/${id}`);
  }

  createTask(boardId: number, task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/${boardId}/tasks`, task);
  }

  updateTask(boardId: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${boardId}/tasks/${task.id}`, task);
  }

  updateTaskStatus(boardId: number, taskId: number, newStatus: string): Observable<Board> {
    return this.http.put<Board>(`${this.baseUrl}/${boardId}/tasks/${taskId}/status`, { status: newStatus });
  }

  updateBoard(id: number, board: Board): Observable<Board> {
    return this.http.put<Board>(`${this.baseUrl}/${id}`, board);
  }

  deleteBoard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  deleteTask(boardId: number, taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${boardId}/tasks/${taskId}`);
  }
  
  getBoardByTitle(title: string): Observable<Board> {
    return this.http.get<Board>(`${this.baseUrl}/title/${title}`);
  }

  saveBoard(title: string): Observable<Board> {
    const board: Board = { id: 0, title, tasks: [] } as Board;
    return this.http.post<Board>(this.baseUrl, board);
  }

  modifyTaskInBoard(boardId: number, taskId: number, task: Task): Observable<Board> {
    return this.http.put<Board>(`${this.baseUrl}/${boardId}/tasks/${taskId}`, task);
  }
}
