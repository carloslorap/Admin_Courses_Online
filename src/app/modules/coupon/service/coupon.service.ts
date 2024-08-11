import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { AuthService } from '../../auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

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
    let URL = URL_SERVICIOS + "/coupon/config"
    this.isLoadingSubject.next(true)
    return this.http.get(URL,{headers:headers}).pipe(finalize(()=>this.isLoadingSubject.next(false)));

  }
showCoupon(coupon_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer ' + this.authservice.token})
    let URL = URL_SERVICIOS + "/coupon/" + coupon_id
    this.isLoadingSubject.next(true)
    return this.http.get(URL,{headers:headers}).pipe(finalize(()=>this.isLoadingSubject.next(false)));

  }
listCoupon(search:any,state:any){

    this.isLoadingSubject.next(true);

    let headers =new HttpHeaders({'Authorization':'Bearer ' + this.authservice.token})

    let LINK = "?T="
    if(search){
      LINK += "&search="+search
    }
    if(state){
      LINK += "&state="+state
    }

    let URL = URL_SERVICIOS + "/coupon"+ LINK

    return this.http.get(URL,{headers:headers}).pipe(finalize(()=>this.isLoadingSubject.next(false)));
  }



  registerCoupon(data:any){

    this.isLoadingSubject.next(true);

    let headers =new HttpHeaders({'Authorization':'Bearer ' + this.authservice.token})

    let URL = URL_SERVICIOS + "/coupon"

    return this.http.post(URL, data,{headers:headers}).pipe(finalize(()=>this.isLoadingSubject.next(false)));
  }
 updateCoupon(data:any,coupon_id:String){

    this.isLoadingSubject.next(true);

    let headers =new HttpHeaders({'Authorization':'Bearer ' + this.authservice.token})

    let URL = URL_SERVICIOS + "/coupon/"+coupon_id

    return this.http.put(URL, data,{headers:headers}).pipe(finalize(()=>this.isLoadingSubject.next(false)));
  }

  deleteCoupon(coupon_id:String){

    this.isLoadingSubject.next(true);

    let headers =new HttpHeaders({'Authorization':'Bearer ' + this.authservice.token})

    let URL = URL_SERVICIOS + "/coupon/"+coupon_id

    return this.http.delete(URL,{headers:headers}).pipe(finalize(()=>this.isLoadingSubject.next(false)));
  }





}
