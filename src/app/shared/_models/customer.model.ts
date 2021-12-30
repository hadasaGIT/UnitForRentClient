export class Customer
 {
    id: number;
    firstName: string;
    lastName: string;
    phon1: string;
    phon2: string;
    email: string;
    password: string;
    isActive: boolean;
    frequencyUpdate?: number;
    lastUpdatedDate?: Date;
  
    constructor() {
      this.id = 0;
    }
  }