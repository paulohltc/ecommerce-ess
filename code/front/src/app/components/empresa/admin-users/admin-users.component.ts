import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users/users.service';
import { MatTableDataSource } from '@angular/material/table';
import { formatCPF } from 'src/app/utils/utils';


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})

export class AdminUsersComponent implements OnInit {

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  formatCPF = formatCPF;

  displayedColumns: string[] = ['user', 'name', 'cpf', 'email', 'delete'];
  dataSource = new MatTableDataSource<User>(this.getUsers())

  constructor(private changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private usersService: UsersService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
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

  refresh() {
    this.usersService.getUsers().subscribe((res) => {
      this.dataSource.data = res;
      this.changeDetectorRef.detectChanges();
    })
  }

  removeUser(index: number) {
    if (index != 0)
      this.usersService.removeUser(index);
    this.refresh();
  }




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.users.filter = filterValue.trim().toLowerCase();
  }

}




