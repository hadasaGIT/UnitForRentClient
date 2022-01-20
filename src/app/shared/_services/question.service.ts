import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../_models/question.model';

@Injectable()
export class QuestionService {
  getAllQuestions(): Observable<Question[]> {
    return this._http.get<Question[]>('/api/Question/GetAllQuestions');
  }
  AddQuestion(q: Question) {
    console.log(q);
    return this._http.post<void>('/api/Question', q);
  }
  deleteQuestion(id: number): Observable<boolean> {
    return this._http.delete<boolean>('/api/Question/' + id);
  }
  updateQuestion(q: Question): Observable<boolean> {
    return this._http.put<boolean>('/api/Question/UpdateQuestion', q);
  }
  GetQuestionsById(housingUnitId: number): Observable<Question[]> {
    return this._http.get<Question[]>(
      '/api/Question/GetQuestionsById/' + housingUnitId
    );
  }
  constructor(private _http: HttpClient) {}
}
