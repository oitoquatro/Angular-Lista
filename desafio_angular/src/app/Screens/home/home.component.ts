import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../Core/services/users/users.service';
import { userData } from 'src/app/Shared/models/dataUser';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../Components/modal/modal.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  error = false;
  dataUser: userData[] = []; // tipagem
  filter: any = '';
  typeFilter = '';

  constructor(
    private matDialog: MatDialog,
    private userService: UsersService
  ) { }

  searchForm = new FormGroup({
    nameStudent: new FormControl(''),
    nationality: new FormControl(''),
  })

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

  searchValue (type: string){
    this.typeFilter = type;
    this.filter = type === 'name' ? this.searchForm.get('nameStudent')!.value : this.searchForm.get('nationality')!.value;
  }
}
