import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PropertyCondition } from "src/app/shared/_models/propery-condition.model";

@Injectable()
export class PropertyConditionSevice{
    getAllPropertyConditions():Observable<PropertyCondition[]>{
        return this._http.get<PropertyCondition[]>("/api/PropertyCondition/GetAllPropertyConditions")
    }
    deletePropertyCondition(id:number):Observable<boolean>{
        return this._http.delete<boolean>('/api/PropertyCondition/'+id)
    }
    addPropertyCondition(pc:PropertyCondition):Observable<boolean>{
        return this._http.post<boolean>('/api/PropertyCondition',pc)
    }
    updatePropertyCondition(pc:PropertyCondition):Observable<boolean>{
        return this._http.put<boolean>('/api/PropertyCondition/UpdatePropertyCondition',pc)
    }
    constructor(private _http:HttpClient){}

}
