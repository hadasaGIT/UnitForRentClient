export class HousingUnit {
  id: '';
  unitOwnersId: number;
  city: string;
  neighborhood: string;
  street: string;
  number: number;
  floor: number;
  elevator: boolean;
  terrace: boolean;
  roomsNum: number;
  solarHeater: boolean;
  furniture: number;
  airConditioning: boolean;
  price: number;
  description: string;
  publishDate: Date;
  occupancyDate: Date;
  viewsNum: number;
  evacuationDate: Date;
  relevant: boolean;
  propertyCondition: number;
  parking: boolean;
  pandorDoors: boolean;
  area: number;
  accessForDisabled: boolean;
  animal: boolean | null;
  securityRoom: boolean;
  constructor() {
    (this.unitOwnersId = 14),
      (this.accessForDisabled = false),
      (this.airConditioning = false),
      (this.animal = false),
      (this.area = 0),
      (this.city = ''),
      (this.description = ''),
      (this.elevator = false),
      (this.evacuationDate = new Date()),
      (this.floor = 2),
      (this.furniture = 1),
      (this.neighborhood = ''),
      (this.number = 2),
      (this.occupancyDate = new Date()),
      (this.pandorDoors = false),
      (this.parking = false),
      (this.price = 0),
      (this.propertyCondition = 1),
      (this.publishDate = new Date()),
      (this.relevant = true),
      (this.roomsNum = 2),
      (this.securityRoom = false),
      (this.solarHeater = false),
      (this.street = ''),
      (this.terrace = false),
      (this.unitOwnersId = 14),
      (this.viewsNum = 0);
  }
}
