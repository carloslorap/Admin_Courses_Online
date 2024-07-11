import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }


  listCategories(search:any,state:any){

    this.isLoadingSubject.next(true);

    let headers =new HttpHeaders({'Authorization':'Bearer ' + this.authservice.token})

    let LINK = "?T="
    if(search){
      LINK += "&search="+search
    }
    if(state){
      LINK += "&state="+state
    }

    let URL = URL_SERVICIOS + "/categorie"+ LINK

    return this.http.get(URL,{headers:headers}).pipe(finalize(()=>this.isLoadingSubject.next(false)));
  }



  registerCategorie(data:any){

    this.isLoadingSubject.next(true);

    let headers =new HttpHeaders({'Authorization':'Bearer ' + this.authservice.token})

    let URL = URL_SERVICIOS + "/categorie"

    return this.http.post(URL, data,{headers:headers}).pipe(finalize(()=>this.isLoadingSubject.next(false)));
  }

  updateCategorie(data:any,categorie_id:String){

    this.isLoadingSubject.next(true);

    let headers =new HttpHeaders({'Authorization':'Bearer ' + this.authservice.token})

    let URL = URL_SERVICIOS + "/categorie/"+categorie_id

    return this.http.post(URL, data,{headers:headers}).pipe(finalize(()=>this.isLoadingSubject.next(false)));
  }

  deleteCategorie(categorie_id:String){

    this.isLoadingSubject.next(true);

    let headers =new HttpHeaders({'Authorization':'Bearer ' + this.authservice.token})

    let URL = URL_SERVICIOS + "/categorie/"+categorie_id

    return this.http.delete(URL,{headers:headers}).pipe(finalize(()=>this.isLoadingSubject.next(false)));
  }
}
