import { Component, OnInit } from '@angular/core';
import { Register } from '../../register.model'
import { RegisterService } from '../../register.service'

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.css']
})
export class AdminTableComponent implements OnInit {
  Register: Register[];
  
  constructor(private registerService: RegisterService) { }

  ngOnInit() {
    this.registerService.getRegisterList().subscribe(res => {
      this.Register = res.map ( e => {
        return{
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as Register;
      })
    });
  }

 deleteRegister(Register: any) {
   if (confirm ("Are you sure you want to delete" + Register.Surname)){
    this.registerService.deleteRegister(Register);
   }
 } 
}
