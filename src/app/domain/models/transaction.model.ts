import { TransactionType } from '../enums/transactionType.enum';

export class Transaction {
    id?: string;
    subscriptionId!: string;
    fundId!: number;
    userId!: string;
    createdAt!: string;
    type!: TransactionType;
}