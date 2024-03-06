import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { loadTranslations } from '@angular/localize';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeDatasource } from 'src/app/model/employee/employee.datasource';
import { Employee, EmployeeTable } from 'src/app/model/employee/employee.model';
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
  employee: EmployeeTable[];
  closeByAdd: boolean = true;
  

  constructor(
    public dialogRef: MatDialogRef<AddSalaryComponent>,
    private payData: PayrollDatasource,
    private empData: EmployeeDatasource,
    @Inject(MAT_DIALOG_DATA) private data: { id: number }
    ) {
    this.salary = new Salary();
    this.employee = new Array<EmployeeTable>();
  }

  ngOnInit(): void {
    this.getEmpWithoutSal();
    if(this.data.id){
      this.editing = true;
      this.getSalary(this.data.id);
    }
 
  }

  salaryForm: FormGroup = new FormGroup({
    employeeId: new FormControl(),
    basic: new FormControl("", Validators.pattern('^[1-9][0-9]+$')),
    medicalAllowance: new FormControl("", Validators.pattern('^[0-9]{0,2}$')),
    providentFund: new FormControl("", Validators.pattern('^[0-9]{0,2}$'))
  });


  getSalary(id: number) {
    this.payData.getSalaryByEmployee(id).subscribe(sal => {
      if (sal) {
        this.salary = sal;
        this.salaryForm.patchValue(sal);
      }
    })
  }


  getEmpWithoutSal(){
    this.empData.getEmpWithoutSal().subscribe(emp => {
      this.employee = emp;
    })
  }



  submit() {
    if (this.salaryForm.valid && this.editing) {
      Object.assign(this.salary, this.salaryForm.value);
      this.payData.updateSalaryByEmployee(this.salary).subscribe(sal => {
        this.dialogRef.close();
      })
    } else if (this.salaryForm.valid) {
      Object.assign(this.salary, this.salaryForm.value);
      this.payData.saveSalaryByEmployee(this.salary).subscribe(sal => {
        this.dialogRef.close();
      })
    }
  }


}
