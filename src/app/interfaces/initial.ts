export interface Initial {
  goalMonth: number;
  totalAmountMonth: number;
  totalAmountPreviousMonth: number;
  purchaseData: PurchaseData;
}
//16.14

interface PurchaseData {
  purchaseMonth: Array<Purchase>;
  purchasePreviouMonth: Array<Purchase>;
}

export interface Purchase {
  amount: number;
  concept: string;
  datePurchase: string;
  icon: string;
  ticketUrl: string;
  typePayment: string;
  typePurchase: string;
  textColor: string,
  color:string
}

