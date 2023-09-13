import { Booking } from "./booking";
import { Reservation } from "./reservation";
import { Ticket } from "./ticket";

export class Trip {
    day: Date | undefined;

    tickets: Ticket[];
    bookings: Booking[];
    reservations: Reservation[];
    constructor(tickets?: Ticket[], bookings?: Booking[], reservations?: Reservation[]) {
        this.tickets = tickets || [];
        this.bookings = bookings || [];
        this.reservations = reservations || [];
    }
}
