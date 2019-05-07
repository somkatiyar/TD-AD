import { OnInit } from "@angular/core";
import { DataService } from "src/app/service/dataservice.service";

export class Back implements OnInit {
   
   goBack() {
       window.history.back();
   }



   constructor() {
  
   }
   
    ngOnInit() {
        
    }

 




    
}