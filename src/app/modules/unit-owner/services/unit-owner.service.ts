import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UnitOwner } from "../models/unit-owner.model";

@Injectable()
export class unitOwnerService {
    GetAllUnitOwners(): Observable<UnitOwner[]> {
    return this._http.get<UnitOwner[]>("/api/UnitOwner/GetAllUnitOwners");
    }
    // מה הפונקציות אמורות להחזיר? task????
    GetUnitOwnerById(id:number):Observable<UnitOwner>{
    return this._http.get<UnitOwner>("/api/UnitOwner/GetUnitOwnerById/"+id);
    }
    AddUnitOwner(unitOwnerToAdd:UnitOwner):Observable<boolean>{
    return this._http.put<boolean>("/api/UnitOwner/AddUnitOwner/",unitOwnerToAdd);
    }
    DeleteUnitOwner(id:number):Observable<boolean>{
    return this._http.delete<boolean>("/api/UnitOwner/DeleteUnitOwner/"+id);
    }
    UpdateUnitOwner(unitOwnerToUpdate:UnitOwner):Observable<boolean>{
    return this._http.put<boolean>("/api/UnitOwner/UpdateUnitOwner/",unitOwnerToUpdate);
    }
    constructor(private _http: HttpClient ) {}
}