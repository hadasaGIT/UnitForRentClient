export class HousingUnit {
  id: number;
  unitOwnersId: number;
  address: string;
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
  animal: boolean;
  securityRoom: boolean;
  floorsBuilding?: number;
  propertyTax?: number;
  committeeHome?: number;
  payment?: number;
  flexible: boolean;
  partners: boolean;
  warehouse: boolean;
  longTerm: boolean;
  kosherKitchen: boolean;
  bars: boolean;
  lat?: number;
  lng?: number;
  constructor() {
    (this.id = 0),
      (this.unitOwnersId = 14),
      (this.accessForDisabled = false),
      (this.airConditioning = false),
      (this.animal = false),
      (this.area = 0),
      (this.description = ''),
      (this.elevator = false),
      (this.evacuationDate = new Date()),
      (this.floor = 2),
      (this.furniture = 1),
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
      (this.address = ''),
      (this.terrace = false),
      (this.unitOwnersId = 14),
      (this.viewsNum = 0);
    this.payment = 0;
    this.flexible = false;
    this.partners = false;
    this.warehouse = false;
    this.longTerm = false;
    this.kosherKitchen = false;
    this.bars = false;
  }
}
