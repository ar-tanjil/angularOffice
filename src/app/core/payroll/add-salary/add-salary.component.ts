import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { loadTranslations } from '@angular/localize';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PayrollDatasource } from 'src/app/model/payroll/payroll.datasouce';
import { Salary } from 'src/app/model/payroll/payroll.model';

@Component({
  selector: 'app-add-salary',
  templateUrl: './add-salary.component.html',
  styleUrls: ['./add-salary.component.scss']
})
export class AddSalaryComponent implements OnInit {

  salary: Salary;
  editing: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) private data: { id: number },
    public dialogRef: MatDialogRef<AddSalaryComponent>,
    private payData: PayrollDatasource) {
        this.salary = new Salary();
  }

  ngOnInit(): void {
    this.getSalary(this.data.id);
  }

  salaryForm: FormGroup = new FormGroup({
    employeeId: new FormControl(this.data.id),
    basic: new FormControl("", Validators.pattern("^[1-9][0-9]+$")),
    medicalAllowance: new FormControl("", Validators.pattern("^[1-9][0-9]+$")),
    providentFund: new FormControl("", Validators.pattern("^[1-9][0-9]+$"))
  });


  getSalary(id: number) {
    this.payData.getSalaryByEmployee(id).subscribe(sal => {
      if (sal) {
        this.salary = sal;
        this.salaryForm.patchValue(sal);
        this.editing = true;
        return;
      }
      
    })

  }

  submit() {
    if (this.salaryForm.valid && this.editing) {
      Object.assign(this.salary, this.salaryForm.value);
      this.payData.updateSalaryByEmployee(this.salary).subscribe(sal => {
        console.log(sal);
      })
    } else if (this.salaryForm.valid) {
      Object.assign(this.salary, this.salaryForm.value);
      this.payData.saveSalaryByEmployee(this.salary).subscribe(sal => {
        console.log(sal);
      })
    }
  }


}
