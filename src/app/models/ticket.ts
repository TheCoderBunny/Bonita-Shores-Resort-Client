export class Ticket {
    day?: Date;
    type?: number;
    constructor(day?: Date, type?: number) {
        this.day = day;
        this.type = type;
    }
}
