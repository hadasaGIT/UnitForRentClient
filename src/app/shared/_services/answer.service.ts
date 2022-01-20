import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from '../_models/answer.model';

@Injectable()
export class AnswerService {
  getAllAnswers(): Observable<Answer[]> {
    return this._http.get<Answer[]>('/api/Answer/GetAllAnswers');
  }
  AddAnswer(p: Answer) {
    return this._http.post<void>('/api/Answer', p);
  }
  deleteAnswer(id: number): Observable<boolean> {
    return this._http.delete<boolean>('/api/Answer/' + id);
  }
  updateAnswer(answer: Answer): Observable<boolean> {
    return this._http.put<boolean>(
      '/api/Answer/UpdateAnswer/' + answer.answersId,
      answer
    );
  }
  GetAnswersByQuestionId(QuestionId: number): Observable<Answer[]> {
    return this._http.get<Answer[]>(
      '/api/Answer/GetAnswersByQuestionId/' + QuestionId
    );
  }
  constructor(private _http: HttpClient) {}
}
