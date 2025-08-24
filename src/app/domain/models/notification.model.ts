import { NotifyType } from '../enums/notifyType.enum';

export class Notification {
    id!: string;
    message!: string;
    type!: NotifyType;

}