import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ICity, ICreateMission, IGetCreateMission, IMission } from '../../../Interface/mission';
import { log } from 'console';
import { AuthResponse } from '../../../Interface/authentication';
import { IMAGE_CONFIG } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AllMissionService {

  apiUrl= 'https://localhost:7120/'
  http=inject(HttpClient)
  constructor() { }

  getMission(country:number, city:number, theme:string, skill:string, sortingOption:number ):Observable<AuthResponse<IMission[]>>
  {
    console.log("In Mission Service")
    let params = new HttpParams()
    .set('country', country)
    .set('city', city)
    .set('theme', theme)
    .set('skill', skill)
    .set('sortingOption', sortingOption.toString());
    
    console.log("Set mission param value");
    // return this.http.get<IMission[]>(this.apiUrl+"api/Mission?country="+country+"&city="+city+ "&theme="+theme+"&skill="+ skill+"&sortingOption="+sortingOption)
    return this.http.get<AuthResponse<IMission[]>>(this.apiUrl+"api/Mission?country="+country+"&city="+city+"&theme="+theme+"&skill="+skill+"&sortingOption="+sortingOption)
    // return this.http.get<AuthResponse<IMission[]>>(this.apiUrl+"Mission",{params})
  }

  crateMissionGet():Observable<AuthResponse<IGetCreateMission>>
  {
    return this.http.get<AuthResponse<IGetCreateMission>>(this.apiUrl+"api/Mission/AddMission")
  }

  getCitiesByCountry(country:number):Observable<AuthResponse<ICity[]>>{
    return this.http.get<AuthResponse<ICity[]>>(this.apiUrl+"api/Mission/city?id="+country)
  }
  
  crateMissionPost(creatMission:ICreateMission):Observable<AuthResponse<string>>{
    return this.http.post<AuthResponse<string>>(this.apiUrl+"api/Mission/AddMission", creatMission)
  }
}
