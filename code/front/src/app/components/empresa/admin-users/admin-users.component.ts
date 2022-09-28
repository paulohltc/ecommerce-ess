import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users/users.service';
import { MatTableDataSource } from '@angular/material/table';
import { formatCPF } from 'src/app/utils/utils';

import { LoggedService } from 'src/app/services/logged/logged.service';



@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})

export class AdminUsersComponent implements OnInit {

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  formatCPF = formatCPF;
  users: any = [];
  displayedColumns: string[] = ['auth', 'name', 'CPF', 'email', 'delete'];
  dataSrc = new MatTableDataSource<any>(this.users);




  constructor(private loggedService: LoggedService, private changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private usersService: UsersService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.refresh();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  getCPFfromIndex(index: number): string {
    return this.users[index].CPF;
  }

  getAllUsers() {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        const map = new Map(Object.entries(users));
        this.users = map.get('users')!
        this.dataSrc = this.users;
      },
      error: () => {
        alert('Erro de consulta de usuários')
      }
    });
  }

  refresh() {
    this.getAllUsers();
    this.changeDetectorRef.detectChanges();
  }

  deleteUser(CPF: string): void {
    this.usersService.deleteUser(CPF).subscribe({
      next: () => {
        this.refresh();
      },
      error: (err) => {
        alert(err.err);
      }
    });
  }


  logOut(): void {
    this.loggedService.logOut();
  }

}




