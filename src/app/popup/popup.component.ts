import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataServiceService } from '../dataService/data-service.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  PopupForm: FormGroup;
  submitted = false;
  whatsOnmind: string;
  location: string;
  keyword:string;
  userid:"Sharmila Mohan";
  privacy:any;
  cprivacy: any;
  dropdown:any;
  fileToUpload:any;
  imageshow =  false;
  imageURL: any;
  WriteApostDetails:any;
  selectedFile: File = null;
  constructor(private apiCall:DataServiceService) { }
 
 ngOnInit(){
   this.PopupForm = new FormGroup({
    whatsOnMind: new FormControl(),
    location: new FormControl(),
    keyword: new FormControl(),
    cPrivacy: new FormControl()
   })
   this.privacy =[
     {id:"1",Name:"Public"},
     {id:"2",Name:"Private"},
     {id:"3",Name:"onlyFriends"},
  ];
this.dropdown = this.privacy[0].Name;
 }
 onSubmitClick(){
    this.whatsOnmind = this.PopupForm.value.whatsOnMind;
    this.location = this.PopupForm.value.location;
    this.keyword = this.PopupForm.value.keyword;
    this.cprivacy = this.PopupForm.value.cPrivacy; 
    this.writeAPostSave(this.whatsOnmind,this.location,this.cprivacy,this.keyword);
  }
  async writeAPostSave(whatsOnmind,location,cprivacy,keyword){
    const uploadData = new FormData();
   //uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
    this.WriteApostDetails = await this.apiCall.writeAPostSave(whatsOnmind,location,cprivacy,keyword,this.selectedFile);
    console.log(this.WriteApostDetails);
  }
  OnFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    this.fileToUpload = event.target.files[0].type;
        console.log(event);
        var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); 
    reader.onload = (event:any) => { 
      this.imageURL = reader.result;
      this.imageshow =  true;
      console.log( this.imageURL ) ;
    }
  }
}
