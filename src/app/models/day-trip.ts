import { Booking } from "./booking";
import { Reservation } from "./reservation";
import { Ticket } from "./ticket";

export class DayTrip {
    tickets?: Ticket[];
    bookings?: Booking[];
    reservations?: Reservation[];
    constructor(tickets: Ticket[], bookings: Booking[], reservations: Reservation[]) {
        this.tickets = tickets;
        this.bookings = bookings;
        this.reservations = reservations;
    }
}
