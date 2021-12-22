import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { observable, Observable } from 'rxjs';
import { HousingUnitRelevantService } from 'src/app/modules/customer/services/housing-unit-relevant.service';
import { HousingUnitFull } from '../_models/housing-unit-full.model';
import { HousingUnit } from '../_models/housing-unit.model';
import { HousingUnitImageService } from './housing-unit-image.service';

@Injectable()
export class HousingUnitFullService {
  constructor(
    private _serviceHousingUnitImage: HousingUnitImageService,
    private _serviceHousingUnitRelevantService: HousingUnitRelevantService
  ) {}

  GetHousingUnitFull(housingUnit: HousingUnit): HousingUnitFull {
    this._serviceHousingUnitImage
      .GetHousingUnitImageById(Number(housingUnit.id))
      .subscribe((image) => {
        return new HousingUnitFull(
          housingUnit,
          image.images,
          this._serviceHousingUnitRelevantService.isRelevantById(
            Number(housingUnit.id)
          )
        );
      });
    return new HousingUnitFull(
      housingUnit,
      '',
      this._serviceHousingUnitRelevantService.isRelevantById(
        Number(housingUnit.id)
      )
    );
  }
}
