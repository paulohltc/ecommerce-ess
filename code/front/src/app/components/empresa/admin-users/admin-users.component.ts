import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users/users.service';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})

export class AdminUsersComponent implements OnInit {

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  public data: employee[] = []

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private usersService: UsersService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  getUsers(): User[] {
    let users: User[] = [];
    this.usersService.getUsers().subscribe(usersList => users = usersList);
    return users;
  }

  makeDataSource(){
    for(let user of this.getUsers()){
      let newUser = {user: user.auth, name: user.name, cpf: user.cpf, email: user.email}
      this.data.push(newUser)
      console.log(this.data);
    }
  }

  displayedColumns: string[] = ['user', 'name', 'cpf', 'email'];
  dataSource = new MatTableDataSource(this.data);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

export interface employee {
  user: string;
  name: string;
  cpf: string;
  email: string;
}


