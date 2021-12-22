import { HousingUnit } from './housing-unit.model';

export class HousingUnitFull {
  housingUnit: HousingUnit;
  image: string[]=[];
  favorite:boolean;
  constructor(housingUnit: HousingUnit, image: string,favorite:boolean) {
    this.image.push(image);
    this.housingUnit = housingUnit;
    this.favorite=favorite;
  }

}
