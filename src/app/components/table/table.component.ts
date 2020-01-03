import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, PageEvent} from '@angular/material';
import { UsersService } from 'src/app/services/users.service';
interface Usuario {
  name: string;
  gender: number;
  location: number;
  email: string;
  age: number;
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  users: Usuario[] = [];
  dataSource = new MatTableDataSource<Usuario>();
  cols: string[] = ['id', 'name', 'location', 'gender', 'email', 'age'];
  indicePagina = [3, 5, 10];
  usersPorPagina = 5;
  totalUsers: number;
  @ViewChild(MatPaginator, {static: false}) paginacion: MatPaginator;
  constructor(private userS: UsersService) { }
  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.userS.getUsers().subscribe(res => {
      this.users = res.users;
      this.dataSource.data = this.users;
      this.totalUsers = this.users.length;
      this.dataSource.paginator = this.paginacion;
      this.dataSource.paginator._intl.itemsPerPageLabel = 'Usuarios por Pagina';
    });
  }
}
