// import { Component, OnInit } from '@angular/core';
// import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';

// @Component({
//   selector: 'app-payment',
//   templateUrl: './payment.component.html',
//   styleUrls: ['./payment.component.scss'],
// })
// export class PaymentComponent implements OnInit {
//   constructor() {}

//   public defaultPrice: string = '30';
//   public payPalConfig?: IPayPalConfig;

//   public showSuccess: boolean = false;
//   public showCancel: boolean = false;
//   public showError: boolean = false;

//   ngOnInit(): void {
//     this.initConfig('30');
//   }

//   private initConfig(price: string): void {
//     this.payPalConfig = {
//       currency: 'EUR',
//       clientId: 'sb',
//       createOrderOnClient: (data) =>
//         <ICreateOrderRequest>{
//           intent: 'CAPTURE',
//           purchase_units: [
//             {
//               amount: {
//                 currency_code: 'EUR',
//                 value: price,
//                 breakdown: {
//                   item_total: {
//                     currency_code: 'EUR',
//                     value: price,
//                   },
//                 },
//               },
//               items: [
//                 {
//                   name: 'Enterprise Subscription',
//                   quantity: '1',
//                   category: 'DIGITAL_GOODS',
//                   unit_amount: {
//                     currency_code: 'EUR',
//                     value: price,
//                   },
//                 },
//               ],
//             },
//           ],
//         },
//       onCancel: (data, actions) => {
//         console.log('OnCancel', data, actions);
//       },
//       onError: (err) => {
//         console.log('OnError', err);
//       },
//       onClick: (data, actions) => {
//         console.log('onClick', data, actions);
//       },
//     };
//   }
// }
