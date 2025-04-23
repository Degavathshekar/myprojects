import { Component, OnInit } from '@angular/core';
import { Board } from '../board';
import { Task } from '../task';
import { BoardService } from '../board-service.service';
import { TaskService } from '../task-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board: Board = { id: 0, title: '', tasks: [] };
  todos: Task[] = [];
  inprogress: Task[] = [];
  dones: Task[] = [];

  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBoard();
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.updateTaskStatusAfterDragDrop(event);
    }
  }

  openDialogForNewTask(): void {
    this.openDialog('Create New Task', { id: 0, title: '', description: '', colour: '', status: 'TODO', deadline: '' });
  }

  openTaskDialog(task: Task): void {
    this.openDialog('Update Task', task);
  }

  private getBoard(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.boardService.getBoardById(+id).subscribe(
        (response: Board) => {
          this.board = response;
          this.splitTaskByStatus(response);
        }
      );
    }
  }

  private splitTaskByStatus(board: Board): void {
    this.todos = board.tasks.filter(t => t.status === 'TODO');
    this.inprogress = board.tasks.filter(t => t.status === 'INPROGRESS');
    this.dones = board.tasks.filter(t => t.status === 'DONE');
  }

  private updateTaskStatusAfterDragDrop(event: CdkDragDrop<Task[]>): void {
    const taskId = +event.item.element.nativeElement.id;
    const containerId = event.container.id;
    const updatedTask = [...this.todos, ...this.inprogress, ...this.dones].find(task => task.id === taskId);

    if (updatedTask) {
      this.updateTaskStatus(updatedTask, containerId);
    }
  }

  private updateTaskStatus(task: Task, containerId: string): void {
    if (containerId === 'todo') {
      task.status = 'TODO';
    } else if (containerId === 'inpro') {
      task.status = 'INPROGRESS';
    } else {
      task.status = 'DONE';
    }

    this.boardService.updateTask(this.board.id, task).subscribe({
      next: () => {
        console.log('Task status updated successfully');
        this.getBoard();
      },
      error: (err) => {
        console.error('Error updating task status', err);
      }
    });
  }

  private openDialog(title: string, task: Task): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: title,
      task: task,
      boardId: this.board.id
    };
    this.dialog.open(TaskDialogComponent, dialogConfig).afterClosed().subscribe(() => {
      this.getBoard();
    });
  }

  deleteTask(taskId: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.boardService.deleteTask(this.board.id, taskId).subscribe({
        next: () => {
          console.log('Task deleted successfully');
          this.getBoard();
        },
        error: (err) => {
          console.error('Error deleting task', err);
        }
      });
    }
  }

  deleteBoard(boardId: number): void {
    if (confirm('Are you sure you want to delete this board?')) {
      this.boardService.deleteBoard(boardId).subscribe({
        next: () => {
          console.log('Board deleted successfully');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error deleting board', err);
        }
      });
    }
  }
}
