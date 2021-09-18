import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Manager } from "../models/manager.model";


@Injectable()
export class managerService {
    GetAllManagers(): Observable<Manager[]> {
    return this._http.get<Manager[]>("/api/Manager/GetAllManagers");
    }
    // מה הפונקציות אמורות להחזיר? task????
    GetManagerById(id:number):Observable<Manager>{
    return this._http.get<Manager>("/api/Manager/GetManagerById/"+id);
    }
    AddManager(managerToAdd:Manager):Observable<boolean>{
    return this._http.put<boolean>("/api/Manager/AddManager/",managerToAdd);
    }
    DeleteManager(id:number):Observable<boolean>{
    return this._http.delete<boolean>("/api/Manager/DeleteManager/"+id);
    }
    UpdateManager(managerToUpdate:Manager):Observable<boolean>{
    return this._http.put<boolean>("/api/Manager/UpdateManager/",managerToUpdate);
    }
    constructor(private _http: HttpClient ) {}
}