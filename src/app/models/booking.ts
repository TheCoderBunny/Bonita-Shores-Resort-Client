export class Booking {
    day?: Date;
    type?: number;
    constructor(day?: Date, type?: number) {
        this.day = day;
        this.type = type;
    }
}
