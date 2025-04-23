import { Component, OnInit } from '@angular/core';
import { Board } from '../board';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BoardDialogComponent } from '../board-dialog/board-dialog.component';
import { BoardService } from '../board-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  boardList:Board[]=[];
  constructor(
    private boardService:BoardService,
    private dialog:MatDialog
  ){ }
  ngOnInit(): void {
      this.getAllBoards();

  }
  openDialogForNewBoard(): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      board:new Board(0,"",[])
    };
    this.dialog.open(BoardDialogComponent,dialogConfig)
  }
  private getAllBoards():void{
    this.boardService.getAllBoards().subscribe(
      Response=> {
        this.boardList = Response;
      }
    )
  }
  
}
