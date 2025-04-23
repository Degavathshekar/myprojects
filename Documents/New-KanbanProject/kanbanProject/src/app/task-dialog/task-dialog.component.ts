import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardService } from '../board-service.service';
import { Task } from '../task';

interface DialogData {
  title: string;
  task: Task;
  boardId: number;
}

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private boardService: BoardService
  ) {

    this.form = this.fb.group({
      title: [this.data.task.title || '', Validators.required],
      description: [this.data.task.description || ''],
      deadline: [this.data.task.deadline || '', Validators.required],
      colour: [this.data.task.colour || '']
    });
  }

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.invalid) {
     
      return;
    }

    const task: Task = {
      ...this.data.task,
      title: this.form.value.title,
      description: this.form.value.description,
      deadline: this.form.value.deadline,
      colour: this.form.value.colour
    };

    if (task.id) {
      this.boardService.updateTask(this.data.boardId, task).subscribe(() => {
        this.dialogRef.close(task);
      });
    } else {
      task.status = 'TODO'; // Set default status for new tasks
      this.boardService.createTask(this.data.boardId, task).subscribe(() => {
        this.dialogRef.close(task);
      });
    }
  }
}
