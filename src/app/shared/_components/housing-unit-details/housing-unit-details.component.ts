import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer2 } from 'src/app/modules/customer/models/customer2.model';
import { customerService } from 'src/app/modules/customer/services/customer.service';
import { Answer } from '../../_models/answer.model';
import { HousingUnitFull } from '../../_models/housing-unit-full.model';
import { Question } from '../../_models/question.model';
import { AnswerService } from '../../_services/answer.service';
import { HousingUnitFullService } from '../../_services/housing-unit-full.service';
import { QuestionService } from '../../_services/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../../_services/feadback.service';
import { Feedback } from '../../_models/feedback.model';
import { Customer } from 'src/app/modules/customer/models/customer.model';
import { HousingUnitRelevant } from 'src/app/modules/customer/models/housing-unit-relevant.model';
import { AppComponent } from 'src/app/app.component';
import { HousingUnitRelevantService } from 'src/app/modules/customer/services/housing-unit-relevant.service';

@Component({
  selector: 'app-housing-unit-details',
  templateUrl: './housing-unit-details.component.html',
  styleUrls: ['./housing-unit-details.component.css'],
})
export class HousingUnitDetailsComponent implements OnInit {
  constructor(
    private _serviceHousingUnitFull: HousingUnitFullService,
    private route: ActivatedRoute,
    private _customerService: customerService,
    private _questionService: QuestionService,
    private _answerService: AnswerService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private _feedbackService: FeedbackService,
    private _app: AppComponent,
    private _serviceHousingUnitRelevant: HousingUnitRelevantService
  ) {}
  favorite: boolean = false;
  index: number = 0;
  imageToShow: string;
  currentUser: Customer2;
  currentHousingUnit: HousingUnitFull;
  currentHousingUnitId: number;
  unitOwner: Customer2;
  phonNumber: string;
  hide: boolean = false;
  emailUnitOwner: string;
  questions: Question[] = [];
  answers: Answer[][] = [];
  newQuestion: Question = {
    description: '',
    customersId: 0,
    date: new Date(),
    housingUnitId: 0,
    questionsId: 0,
  };
  feedbacks: Feedback[] = [];
  newFeedback: Feedback = {
    customersId: 0,
    description: '',
    housingUnitId: 0,
    date: new Date(),
    id: 0,
  };
  customersFeedback: Customer2[] = [];

  ngOnInit(): void {
    this.route.params.subscribe((p) => {
      this.currentHousingUnitId = Number(p.housingUnitId);
      try {
        this.GetHousingUnitById(this.currentHousingUnitId);
        this.getCustomerById();
      } catch (error) {
        console.log(error);
      }
    });
  }
  GetHousingUnitById(id: number) {
    this._customerService.getCustomerId();
    this._serviceHousingUnitFull
      .GetHousingUnitFullByHousingUnit(id, this._customerService.customerId)
      .subscribe((res) => {
        console.log(res);
        if (res.housingUnit != null) {
          this.currentHousingUnit = res;
          this.favorite = this.currentHousingUnit.isFavorite;
          this.imageToShow =
            this.currentHousingUnit.images.length == 0
              ? '../../../../assets/img/LOGO.jpg'
              : this.currentHousingUnit.images[0];
          this.getUnitOwner(this.currentHousingUnit.housingUnit.unitOwnersId);
          this.GetQuestionsAndAnswerById(
            Number(this.currentHousingUnit.housingUnit.id)
          );
          this.getFeedback(Number(this.currentHousingUnit.housingUnit.id));
        } else {
          //לנתב ל --page not found 404 page
          this._router.navigate(['../']);
        }
      });
  }
  //------------images
  prev() {
    if (this.currentHousingUnit.images.length != 0) {
      this.index =
        this.index >= this.currentHousingUnit.images.length - 1
          ? 0
          : this.index + 1;
      this.imageToShow = this.currentHousingUnit.images[this.index];
    }
  }
  next() {
    if (this.currentHousingUnit.images.length != 0) {
      this.index =
        this.index <= 0
          ? this.currentHousingUnit.images.length - 1
          : this.index - 1;
      this.imageToShow = this.currentHousingUnit.images[this.index];
    }
  }
  currentSlide(image: string) {
    this.imageToShow = image;
    this.index = this.currentHousingUnit.images.findIndex((x) => x == image);
    console.log(this.index);
  }
  //-----------
  getUnitOwner(id: number) {
    this._customerService.GetCustomerById(id).subscribe((c) => {
      this.unitOwner = c;
      this.phonNumber = 'https://wa.me/' + this.unitOwner.phon1;

      this.emailUnitOwner = 'mailto:' + this.unitOwner.email;
    });
  }
  getCustomerById() {
    this._customerService.getCustomerId();
    this._customerService
      .GetCustomerById(this._customerService.customerId)
      .subscribe((customer) => {
        this.currentUser = customer;
      });
  }
  //favorite
  housingUnitRelevant?: HousingUnitRelevant;
  addFavorite() {
    this.housingUnitRelevant = {
      CustomersId: this.currentUser.id,
      HousingUnitId: this.currentHousingUnit.housingUnit.id,
    };
    if (this._customerService.getUserType() > 0) {
      try {
        this._serviceHousingUnitRelevant
          .AddHousingUnitRelevant(this.housingUnitRelevant)
          .subscribe(() => {
            this._app.numFavorite += 1;
            this.housingUnitRelevant = undefined;
            this.favorite = true;
          });
      } catch (err) {
        this._snackBar.open('אופסס, קרתה תקלה בשרת, נסה שוב!', '  ', {
          duration: 2000,
        });
      }
    } else {
      this._snackBar.open('נא התחבר לחשבונך, או צור חשבון חדש', '  ', {
        duration: 2000,
      });
    }
  }
  removeFavorite() {
    this.housingUnitRelevant = {
      CustomersId: this.currentUser.id,
      HousingUnitId: this.currentHousingUnit.housingUnit.id,
    };
    try {
      this._serviceHousingUnitRelevant
        .deleteHousingUnitRelevant(this.housingUnitRelevant)
        .subscribe(() => {
          this.favorite = false;
          this._app.numFavorite -= 1;
        });
    } catch (err) {
      this._snackBar.open('אופסס, קרתה תקלה בשרת, נסה שוב!', '  ', {
        duration: 2000,
      });
    }
  }
  //check the customer have access
  isActive() {
    if (this.currentUser.isActive) this.hide = true;
  }
  getAnswersByQuestionId(questionId: number, index: number) {
    this._answerService
      .GetAnswersByQuestionId(questionId)
      .subscribe((answer) => {
        this.answers[index] = answer;
      });
  }
  GetQuestionsAndAnswerById(housingUnitId: number) {
    let index = 0;
    this._questionService
      .GetQuestionsById(housingUnitId)
      .subscribe((questions) => {
        if (questions) {
          this.questions = questions;
          this.answers.length = this.questions.length;
          this.questions.forEach((question) => {
            this.getAnswersByQuestionId(question.questionsId, index);
            index++;
          });
        }
      });
  }
  addQuestion(description: string) {
    this.newQuestion = {
      description: description,
      customersId: this._customerService.customerId,
      date: new Date(),
      housingUnitId: this.currentHousingUnitId,
      questionsId: 0,
    };
    this._questionService.AddQuestion(this.newQuestion).subscribe(() => {
      this._snackBar.open(
        'שאלתך נוספה בהצלחה ותענה בהקדם ע"י בעל הדירה',
        '  ',
        {
          duration: 3000,
        }
      );
      this.newQuestion = {
        description: '',
        customersId: 0,
        date: new Date(),
        housingUnitId: 0,
        questionsId: 0,
      };
    });
  }
  getFeedback(housingUnitId: number) {
    let index = 0;
    this._feedbackService
      .GetFeedbacksByHousingUnitId(housingUnitId)
      .subscribe((feedbacks) => {
        console.log(feedbacks);
        this.feedbacks = feedbacks;
        if (this.feedbacks) {
          this.customersFeedback.length = this.feedbacks.length;
          this.feedbacks.forEach((feedback) => {
            this.getCustomerByIdForFeedback(feedback.customersId, index);
            index++;
          });
        }
      });
  }
  getCustomerByIdForFeedback(customerId: number, index: number) {
    this._customerService.GetCustomerById(customerId).subscribe((customer) => {
      this.customersFeedback[index] = customer;
    });
  }
  addFeedback(description: string) {
    this.newFeedback = {
      description: description,
      customersId: this._customerService.customerId,
      date: new Date(),
      housingUnitId: this.currentHousingUnitId,
      id: 0,
    };
    this._feedbackService.AddFeedback(this.newFeedback).subscribe(() => {
      this._snackBar.open('תודה על המשוב!', '  ', {
        duration: 2000,
      });
      this.newFeedback = {
        customersId: 0,
        description: '',
        housingUnitId: 0,
        date: new Date(),
        id: 0,
      };
      this.getFeedback(Number(this.currentHousingUnitId));
    });
  }
}
