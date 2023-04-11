import { ApiService } from './../services/api.service';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {


  employeeForm!: FormGroup;
  actionBtn: string = 'Save';

    constructor(private formBuilder: FormBuilder,
       private apiService: ApiService,
       private dialogRef: MatDialogRef<DialogComponent>,
       @Inject(MAT_DIALOG_DATA) public editData: any) { }

    ngOnInit(): void {
          this.employeeForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required]
          });
          if(this.editData)
          {
            this.actionBtn = "Update";
            this.employeeForm.controls['firstName'].setValue(this.editData.firstName);
            this.employeeForm.controls['lastName'].setValue(this.editData.lastName);
            this.employeeForm.controls['email'].setValue(this.editData.email);
            this.employeeForm.controls['password'].setValue(this.editData.password);
          }
    }
    addEmployee(): void {
      if(!this.editData){
       if(this.employeeForm.valid)
       {
        this.apiService.postEmployee(this.employeeForm.value)
        .subscribe({
          next: (res) => {
            alert("Employee added successfully");
            this.employeeForm.reset();
            this.dialogRef.close('save');
        },
        error: () => {
          alert("Error adding employee");
        }
      }
        )
      }
    } else {
      this.updateEmployee();
    }
  }

  updateEmployee(): void {
     this.apiService.putEmployee(this.employeeForm.value, this.editData.id)
     .subscribe({ next: (res) => {
      alert("Employee updated successfully");
      this.employeeForm.reset();
      this.dialogRef.close('update');
    },
    error: () => {
      alert("Error updating employee");
  }});

  }
  }
