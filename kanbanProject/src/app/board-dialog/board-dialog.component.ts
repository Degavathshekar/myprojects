import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardService } from '../board-service.service';
import { Board } from '../board';

interface DialogData {
  title?: string;
}

@Component({
  selector: 'app-board-dialog',
  templateUrl: './board-dialog.component.html',
  styleUrls: ['./board-dialog.component.css']
})
export class BoardDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BoardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private boardService: BoardService
  ) {
    this.form = this.fb.group({
      title: [this.data.title || '', Validators.required]
    });
  }

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    const title = this.form.get('title')?.value || '';
    if (title) {
      this.boardService.saveBoard(title).subscribe(
        (response: Board) => {
          console.log(response);
        },
        (error: any) => {
          console.error('Error saving board:', error);
        }
      );
    }
    this.dialogRef.close();
    window.location.reload();
  }
}
