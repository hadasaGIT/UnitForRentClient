import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FurnitureLevel } from 'src/app/shared/_models/furniture-level.models';
import { FurnitureLevelService } from 'src/app/shared/_services/furniture-level.service';

@Component({
  selector: 'app-edit-furniture-level',
  templateUrl: './edit-furniture-level.component.html',
  styleUrls: ['./edit-furniture-level.component.css'],
})
export class EditFurnitureLevelComponent implements OnInit {
  furnitureLevelsList: Observable<FurnitureLevel[]>;
  newFurnitureLevel?: FurnitureLevel = undefined;
  constructor(private _furnitureLevelService: FurnitureLevelService) {}

  deleteFurnitureLevel(id: number) {
    this._furnitureLevelService.deleteFurnitureLevel(id).subscribe(
      () => {
        this.furnitureLevelsList =
          this._furnitureLevelService.getAllFurnitureLevels();
      },
      () => alert('המחיקה לא אושרה')
    );
  }

  saveChanges(furnitureLevel: FurnitureLevel, level: string) {
    furnitureLevel.level = level;
    this._furnitureLevelService.updateFurnitureLevel(furnitureLevel).subscribe(
      () =>
        (this.furnitureLevelsList =
          this._furnitureLevelService.getAllFurnitureLevels()),
      () => alert('השינוי לא אושר')
    );
  }

  openNewListItem() {
    this.newFurnitureLevel = new FurnitureLevel();
  }

  addFurnitureLevel(_level: string) {
    this.newFurnitureLevel = { id: 0, level: _level };
    this._furnitureLevelService
      .addFurnitureLevel(this.newFurnitureLevel)
      .subscribe(() => {
        this.furnitureLevelsList =
          this._furnitureLevelService.getAllFurnitureLevels();
        this.newFurnitureLevel = undefined;
      });
  }
  ngOnInit(): void {
    this.furnitureLevelsList =
      this._furnitureLevelService.getAllFurnitureLevels();
  }
}
