import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../Core/services/users/users.service';
import { userData } from 'src/app/Shared/models/dataUser';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../Components/modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  error = false;
  dataUser: userData[] = []; // tipagem

  constructor(
    private matDialog: MatDialog,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    try {
      this.userService.getUsers('10').subscribe({
        next: response => this.dataUser = response.results,
        error: (error) => {
          console.log(error);
          this.error = true;
        },
        complete: () => {
          console.log('finish request');
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  openModal(userSelected: userData) {
    const dialogRef = this.matDialog.open(ModalComponent, {
      minWidth: 500,
      data: {
        userData: userSelected
      },
    })
  }
}
