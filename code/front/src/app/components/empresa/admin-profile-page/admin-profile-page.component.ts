import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoggedService } from 'src/app/services/logged/logged.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-admin-profile-page',
  templateUrl: './admin-profile-page.component.html',
  styleUrls: ['./admin-profile-page.component.css']

})
export class AdminProfilePageComponent implements OnInit {
  editProfileDisplay = true;
  myShopsDisplay = false;
  msgEditDisplay = false;


  mobileQuery: MediaQueryList;

  errorMsg = false;
  showPassword: boolean = false;

  private _mobileQueryListener: () => void;

  public userEditForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private media: MediaMatcher, private changeDetectorRef: ChangeDetectorRef, private loggedService: LoggedService, private formBuilder: FormBuilder, private usersService: UsersService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }


  ngOnInit(): void {
    let userCPF: string = this.loggedService.getCPF();
    let currUser: User = this.usersService.getUserFromCPF(userCPF);
    this.userEditForm.patchValue({
      name: [currUser.name],
      email: [currUser.email],
      password: [currUser.password],
    })
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  cleanUserForm(): void {
    this.userEditForm.patchValue({
      name: [''],
      email: [''],
      password: [''],
    });
  }

  validForm(): boolean {
    let valid = true;
    Object.keys(this.userEditForm.controls).forEach(key => {
      valid = (this.userEditForm.controls[key].status == "VALID") && valid;
    });
    return valid;
  }

  saveEdit(): void {
    if (this.validForm()) {
      let userCPF: string = this.loggedService.getCPF();
      this.usersService.updateUser(userCPF, this.userEditForm.value);
      this.msgEditDisplay = true;
      this.errorMsg = false;
    }
    else {
      this.errorMsg = true;
    }
  }

  editProfile() {
    this.editProfileDisplay = true;
    this.myShopsDisplay = false;
  }

  myShops() {
    this.editProfileDisplay = false;
    this.myShopsDisplay = true;
  }

  logOut(): void {
    this.loggedService.logOut();
  }

}
