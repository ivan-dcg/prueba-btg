import { TransactionType } from '../enums/transactionType.enum';

export class Transaction {
    id!: string;
    subscriptionId!: string;
    createdAt!: string;
    type!: TransactionType;
}