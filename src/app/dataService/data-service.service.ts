import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) { }

  writeAPostSave(whatsOnmind, location,privacy,keyword,uploadData) {
    interface UserResponse {
      success: boolean;
      dataset: any;
    }
    const headerKey = {'Content-Type': 'application/json', 'Accept': '', 'Authkey': ''};
    const headers = new HttpHeaders(headerKey);

    const body = JSON.stringify({
      'whatsOnmind': whatsOnmind,
      'location': location,
      'privacy': privacy,
      'keyword': keyword,
      'uploadData':uploadData
     
    });

    return new Promise(resolve => {
      this.http.post('http://localhost:3000/writeApostData', body,{headers: headers, observe: 'response'})
        .subscribe((response: HttpResponse<UserResponse>) => {
            if (response.status === 201) {
                resolve(true);
              } else {
                resolve(false);
              }
          }, error => {
            resolve(false);
          }
        );
    });
  }
}
