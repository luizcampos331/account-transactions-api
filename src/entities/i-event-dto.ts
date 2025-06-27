export interface IEventDTO {
  account_id: string;
  type: 'deposit' | 'withdraw';
  amount: number;
}
