import { DatePipe, formatDate } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FurnitureLevel } from 'src/app/shared/_models/furniture-level.models';
import { HousingUnit } from 'src/app/shared/_models/housing-unit.model';
import { PropertyCondition } from 'src/app/shared/_models/property-condition.model';
import { FurnitureLevelService } from 'src/app/shared/_services/furniture-level.service';
import { HousingUnitService } from 'src/app/shared/_services/housing-unit.service';
import { PropertyConditionService } from 'src/app/shared/_services/property-condition.service';
import { customerService } from '../../services/customer.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HousingUnitImage } from 'src/app/shared/_models/housing-unit-image.model';
import { HousingUnitImageService } from 'src/app/shared/_services/housing-unit-image.service';
import { GoogleMap } from '@angular/google-maps';
import { QuestionService } from 'src/app/shared/_services/question.service';
import { AnswerService } from 'src/app/shared/_services/answer.service';
import { Answer } from 'src/app/shared/_models/answer.model';
import { Question } from 'src/app/shared/_models/question.model';

@Component({
  selector: 'app-housing-unit-list',
  templateUrl: './housing-unit-list.component.html',
  styleUrls: [
    './housing-unit-list.component.css',
    '../publish-housing-unit/publish-housing-unit.component.css',
  ],
})
export class HousingUnitListComponent implements OnInit {
  constructor(
    private _housingUnitService: HousingUnitService,
    private _housingUnitImageService: HousingUnitImageService,
    private _customerService: customerService,
    private _serviceFurnitureLevel: FurnitureLevelService,
    private _servicePropertyCondition: PropertyConditionService,
    private fb: FormBuilder,
    public datePipe: DatePipe,
    private _snackBar: MatSnackBar,
    private modalService: NgbModal,
    private _router: Router,
    private _questionService: QuestionService,
    private _answerService: AnswerService
  ) {}
  filterRelevant: boolean = false;
  updateForm: FormGroup;
  housingUnitList: MatTableDataSource<HousingUnit>;
  customerId: number;
  listFurnitureLevel: FurnitureLevel[];
  listPropertyConditions: PropertyCondition[];
  housingUnitToDelete: HousingUnit;
  housingUnitToUpdate: HousingUnit;
  bool: boolean = false;
  images: HousingUnitImage[] = [
    {
      Id: 0,
      housingUnitId: 0,
      image: '../../../../../assets/img/imageHead.png',
    },
    { Id: 1, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
    { Id: 2, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
    { Id: 3, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
    { Id: 4, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
    { Id: 5, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
    { Id: 6, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
    { Id: 7, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
    { Id: 8, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
    { Id: 9, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
  ];
  displayedColumns: string[] = [
    'id',
    'address',
    'price',
    'publishDate',
    'status',
    'view',
    'edit',
    'questionAnswers',
    'delete',
  ];
  private _searchLat: number;
  private _searchLng: number;
  @ViewChild('mapSearchField') searchField: ElementRef;
  @ViewChild(GoogleMap) googleMap: GoogleMap;
  idToImage: number = 0;
  closeResult = '';
  modalReference: NgbModalRef;
  modalReferenceQuestion: NgbModalRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  questions: Question[] = [];
  answers: Answer[][] = [];
  newAnswer: Answer = {
    description: '',
    answersId: 0,
    questionsId: 0,
    date: new Date(),
  };
  unitIdForQuestion: number = 0;

  ngOnInit() {
    this.getFurnitureLevel();
    this.getPropertyCondition();
    this._customerService.getCustomerId();
    this.customerId = this._customerService.customerId;
    this.GetHousingUnitByCustomerId();
  }
  ngAfterViewInit() {
    console.log(this.searchField);
    if (this.searchField && this.searchField.nativeElement) {
      const searchBox = new google.maps.places.SearchBox(
        this.searchField.nativeElement
      );
      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) {
          return;
        }
        const bounds = new google.maps.LatLngBounds();
        places.forEach((place) => {
          if (!place.geometry || !place.geometry?.location) {
            return;
          }
          this._searchLat = place.geometry.location.lat();
          this._searchLng = place.geometry.location.lng();
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        // this.googleMap.fitBounds(bounds);
      });
    }
  }
  getFurnitureLevel() {
    this._serviceFurnitureLevel.getAllFurnitureLevels().subscribe((res) => {
      this.listFurnitureLevel = res;
    });
  }
  getPropertyCondition() {
    this._servicePropertyCondition
      .getAllPropertyConditions()
      .subscribe((res) => {
        this.listPropertyConditions = res;
      });
  }
  GetHousingUnitByCustomerId() {
    this._housingUnitService
      .GetHousingUnitByCustomerId(this.customerId)
      .subscribe((data) => {
        console.log(data);
        // this.housingUnitList = data;
        this.housingUnitList = new MatTableDataSource<HousingUnit>(data);
        this.housingUnitList.paginator = this.paginator;
        this.housingUnitList.sort = this.sort;
      });
  }
  filterHousingUnitByRelevant(filterRelevant: boolean) {
    if (filterRelevant == true) {
      this.filterRelevant = true;
      this._housingUnitService
        .GetHousingUnitByRelevantAndCustomerId(this.customerId)
        .subscribe((data) => {
          // this.housingUnitList = data;
          this.housingUnitList = new MatTableDataSource<HousingUnit>(data);
          this.housingUnitList.paginator = this.paginator;
          this.housingUnitList.sort = this.sort;
        });
    } else {
      this.filterRelevant = false;
      this._housingUnitService
        .GetHousingUnitByCustomerId(this.customerId)
        .subscribe((data) => {
          // this.housingUnitList = data;
          this.housingUnitList = new MatTableDataSource<HousingUnit>(data);
          this.housingUnitList.paginator = this.paginator;
          this.housingUnitList.sort = this.sort;
        });
    }
  }
  initForm(housingUnitToUpdate: HousingUnit) {
    console.log(housingUnitToUpdate);
    this.updateForm = this.fb.group({
      id: [housingUnitToUpdate.id],
      unitOwnersId: [housingUnitToUpdate.unitOwnersId],
      viewsNum: [housingUnitToUpdate.viewsNum],
      address: [housingUnitToUpdate.address, [Validators.required]],
      area: [housingUnitToUpdate.area, [Validators.required]],
      floor: [housingUnitToUpdate.floor, Validators.required],
      floorsBuilding: [housingUnitToUpdate.floorsBuilding, []],
      price: [housingUnitToUpdate.price, [Validators.required]],
      roomsNum: [housingUnitToUpdate.roomsNum, [Validators.required]],
      description: [
        housingUnitToUpdate.description,
        [Validators.required, Validators.max(425)],
      ],
      occupancyDate: [
        formatDate(housingUnitToUpdate.occupancyDate, 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],
      parking: [housingUnitToUpdate.parking, []],
      securityRoom: [housingUnitToUpdate.securityRoom, []],
      accessForDisabled: [housingUnitToUpdate.accessForDisabled, []],
      elevator: [housingUnitToUpdate.elevator, []],
      terrace: [housingUnitToUpdate.terrace, []],
      solarHeater: [housingUnitToUpdate.solarHeater, []],
      airConditioning: [housingUnitToUpdate.airConditioning, []],
      pandorDoors: [housingUnitToUpdate.pandorDoors, []],
      animal: [housingUnitToUpdate.animal, []],
      furniture: [housingUnitToUpdate.furniture, [Validators.required]],
      propertyCondition: [
        housingUnitToUpdate.propertyCondition,
        Validators.required,
      ],
      propertyTax: [housingUnitToUpdate.propertyTax, []],
      committeeHome: [housingUnitToUpdate.committeeHome, []],
      payment: [housingUnitToUpdate.payment, []],
      flexible: [housingUnitToUpdate.flexible, []],
      partners: [housingUnitToUpdate.partners, []],
      warehouse: [housingUnitToUpdate.warehouse, []],
      longTerm: [housingUnitToUpdate.longTerm, []],
      kosherKitchen: [housingUnitToUpdate.kosherKitchen, []],
      bars: [housingUnitToUpdate.bars, []],
      evacuationDate: [
        formatDate(housingUnitToUpdate.evacuationDate, 'yyyy-MM-dd', 'en'),
        [],
      ],
      relevant: [housingUnitToUpdate.relevant, []],
      publishDate: [housingUnitToUpdate.publishDate, []],
    });
  }
  view(housingUnitToUpdate: HousingUnit) {
    this._router.navigate([]).then((result) => {
      window.open('../details/' + housingUnitToUpdate.id, '_blank');
    });
  }
  deleteHousingUnit(housingUnitToDelete: HousingUnit) {
    this.housingUnitToDelete = housingUnitToDelete;
    this._housingUnitService
      .deleteHousingUnit(this.housingUnitToDelete.id)
      .subscribe((res) => {
        this._snackBar.open(
          'מודעה מספר ' + housingUnitToDelete.id + ' נמחקה בהצלחה!',
          ' ',
          { duration: 3000 }
        );
        this.filterHousingUnitByRelevant(this.filterRelevant);
      });
  }
  undo() {
    this.modalReference.close();
    this.initForm(this.housingUnitToUpdate);
    this._snackBar.open('השינויים בוטלו!', ' ', { duration: 3000 });
    this.images = [
      {
        Id: 0,
        housingUnitId: 0,
        image: '../../../../../assets/img/imageHead.png',
      },
      { Id: 1, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
      { Id: 2, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
      { Id: 3, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
      { Id: 4, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
      { Id: 5, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
      { Id: 6, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
      { Id: 7, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
      { Id: 8, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
      { Id: 9, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
    ];
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.housingUnitList.filter = filterValue.trim().toLowerCase();

    if (this.housingUnitList.paginator) {
      this.housingUnitList.paginator.firstPage();
    }
  }
  edit(housingUnitToEdit: HousingUnit, content: any) {
    this.images = [
      {
        Id: 0,
        housingUnitId: 0,
        image: '../../../../../assets/img/imageHead.png',
      },
      { Id: 1, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
      { Id: 2, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
      { Id: 3, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
      { Id: 4, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
      { Id: 5, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
      { Id: 6, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
      { Id: 7, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
      { Id: 8, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
      { Id: 9, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
    ];
    this.initForm(housingUnitToEdit);
    this.housingUnitToUpdate = housingUnitToEdit;
    let index = 0;
    this._housingUnitImageService
      .GetHousingUnitImagesById(this.housingUnitToUpdate.id)
      .subscribe((image) => {
        console.log(image);
        image.forEach((element) => {
          console.log(element);
          this.images[index++] = element;
        });
      });
    this.modalReference = this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'wid',
    });
  }
  updateHousingUnitFull() {
    this.housingUnitToUpdate = this.updateForm.value;
    this.housingUnitToUpdate.lat = this._searchLat;
    this.housingUnitToUpdate.lng = this._searchLng;
    this.housingUnitToUpdate.publishDate = new Date();
    console.log(this.housingUnitToUpdate);
    if (
      this.updateForm.get('relevant')!.value == true ||
      this.updateForm.get('relevant')!.value == 'true'
    )
      this.housingUnitToUpdate.relevant = true;
    else this.housingUnitToUpdate.relevant = false;

    this._housingUnitService
      .UpdateHousingUnit(this.housingUnitToUpdate, this.housingUnitToUpdate.id)
      .subscribe((res) => {
        this.updateImages();
        this._snackBar.open(
          'מודעה מספר ' + this.housingUnitToUpdate.id + ' עודכנה בהצלחה!',
          ' ',
          { duration: 3000 }
        );

        this.filterHousingUnitByRelevant(this.filterRelevant);
      });
    this.modalReference.close();
  }
  //img
  removeImage(id: number) {
    this.images[id].image =
      id == 0
        ? '../../../../../assets/img/imageHead.png'
        : '../../../../../assets/img/LOGO.jpg';
  }
  base64: string | ArrayBuffer | null;
  uploadFile(fileInput: any) {
    try {
      let reader = new FileReader();
      reader.readAsDataURL(fileInput.files[0]);
      reader.onload = () => {
        this.base64 = reader.result;
        if (this.base64 && this.idToImage > -1) {
          this.images[this.idToImage].image = this.base64.toString();
        }
      };
    } catch (e) {}
  }
  addImage(id: number) {
    this.idToImage = id;
  }
  updateImages() {
    this._housingUnitImageService
      .deleteAllHousingUnitImage(this.housingUnitToUpdate.id)
      .subscribe((data) => {
        console.log('delete all housing unit images');
      });
    var imageToUpdate = this.images;
    imageToUpdate.forEach((image) => {
      if (
        image.image != '../../../../../assets/img/imageHead.png' &&
        image.image != '../../../../../assets/img/LOGO.jpg'
      ) {
        image.housingUnitId = this.housingUnitToUpdate.id;
        image.Id = 0;
        this._housingUnitImageService
          .AddHousingUnitImage(image)
          .subscribe((image) => {
            'add success';
          });
      }
    });
    this.images = [
      {
        Id: 0,
        housingUnitId: 0,
        image: '../../../../../assets/img/imageHead.png',
      },
      { Id: 1, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
      { Id: 2, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
      { Id: 3, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
      { Id: 4, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
      { Id: 5, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
      { Id: 6, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
      { Id: 7, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
      { Id: 8, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
      { Id: 9, housingUnitId: 0, image: '../../../../../assets/img/LOGO.jpg' },
    ];
  }
  //answers and question
  viewQuestionAnswers(id: number, q: any) {
    this.unitIdForQuestion = id;
    this.GetQuestionsAndAnswerById(id);
    this.modalReferenceQuestion = this.modalService.open(q, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'wid',
    });
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
  addAnswer(description: string, questionId: number) {
    this.newAnswer = {
      description: description,
      date: new Date(),
      answersId: 0,
      questionsId: questionId,
    };
    this._answerService.AddAnswer(this.newAnswer).subscribe((answer) => {
      this.GetQuestionsAndAnswerById(this.unitIdForQuestion);
      console.log('add answer success');
      this.newAnswer = {
        description: '',
        answersId: 0,
        questionsId: 0,
        date: new Date(),
      };
    });
  }
  updateAnswer(updateAnswer: string, answer: Answer) {
    answer.description = updateAnswer;
    console.log(answer);
    this._answerService.updateAnswer(answer).subscribe((answer) => {
      console.log('answer update success');
    });
  }
  deleteAnswer(answer: Answer) {
    this._answerService.deleteAnswer(answer.answersId).subscribe((res) => {
      console.log('delete answer success');
      this.GetQuestionsAndAnswerById(this.unitIdForQuestion);
    });
  }
  //
}
