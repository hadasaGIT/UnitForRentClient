import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../_models/feedback.model';

@Injectable()
export class FeedbackService {
  getAllAnswers(): Observable<Feedback[]> {
    return this._http.get<Feedback[]>('/api/Feedback/GetAllFeedbacks');
  }
  AddFeedback(p: Feedback) {
    return this._http.post<void>('/api/Feedback', p);
  }
  deleteFeedback(id: number): Observable<boolean> {
    return this._http.delete<boolean>('/api/Feedback/' + id);
  }
  updateFeedback(pc: Feedback): Observable<boolean> {
    return this._http.put<boolean>('/api/Feedback/UpdateFeedback', pc);
  }
  GetFeedbacksByHousingUnitId(HousingUnitId: number): Observable<Feedback[]> {
    return this._http.get<Feedback[]>(
      '/api/Feedback/GetFeedbacksByHousingUnitId/'+ HousingUnitId
    );
  }
  constructor(private _http: HttpClient) {}
}
