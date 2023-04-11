import { Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'api_front';

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'password', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // constructor
  constructor(private dialog: MatDialog, private api: ApiService) {}
  // implementation of onInit method
  ngOnInit(): void {
    this.getAllEmployee();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%',
    }).afterClosed().subscribe(val => {
      if(val=='save')
      {
        this.getAllEmployee();
      }
    });
  }

  getAllEmployee()
  {
    this.api.getEmployee()
    .subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert("Error occurred");
      }
    });
  }

  editEmployee(row: any){
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val==='update')
      {
        this.getAllEmployee();
      }
    });
  }

  deleteEmployee(id: number){
      this.api.deleteEmployee(id).subscribe({ next: (res) => {
        alert("Employee deleted successfully");
        this.getAllEmployee();
      },
      error: (err) => {
        alert("Error occurred while deleting Employee");
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}



