import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }


  listConfig(){
    let headers = new HttpHeaders({'Authorization': 'Bearer ' + this.authservice.token})
    let URL = URL_SERVICIOS + "/discount/config"
    this.isLoadingSubject.next(true)
    return this.http.get(URL,{headers:headers}).pipe(finalize(()=>this.isLoadingSubject.next(false)));

  }
showDiscount(discount_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer ' + this.authservice.token})
    let URL = URL_SERVICIOS + "/discount/" + discount_id
    this.isLoadingSubject.next(true)
    return this.http.get(URL,{headers:headers}).pipe(finalize(()=>this.isLoadingSubject.next(false)));

  }
listDiscount(search:any,state:any){

    this.isLoadingSubject.next(true);

    let headers =new HttpHeaders({'Authorization':'Bearer ' + this.authservice.token})

    let LINK = "?T="
    if(search){
      LINK += "&search="+search
    }
    if(state){
      LINK += "&state="+state
    }

    let URL = URL_SERVICIOS + "/discount"+ LINK

    return this.http.get(URL,{headers:headers}).pipe(finalize(()=>this.isLoadingSubject.next(false)));
  }



  registerDiscount(data:any){

    this.isLoadingSubject.next(true);

    let headers =new HttpHeaders({'Authorization':'Bearer ' + this.authservice.token})

    let URL = URL_SERVICIOS + "/discount"

    return this.http.post(URL, data,{headers:headers}).pipe(finalize(()=>this.isLoadingSubject.next(false)));
  }
 updateDiscount(data:any,discount_id:String){

    this.isLoadingSubject.next(true);

    let headers =new HttpHeaders({'Authorization':'Bearer ' + this.authservice.token})

    let URL = URL_SERVICIOS + "/discount/"+discount_id

    return this.http.put(URL, data,{headers:headers}).pipe(finalize(()=>this.isLoadingSubject.next(false)));
  }

  deleteDiscount(discount_id:String){

    this.isLoadingSubject.next(true);

    let headers =new HttpHeaders({'Authorization':'Bearer ' + this.authservice.token})

    let URL = URL_SERVICIOS + "/discount/"+discount_id

    return this.http.delete(URL,{headers:headers}).pipe(finalize(()=>this.isLoadingSubject.next(false)));
  }


}
