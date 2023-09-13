import { Injectable } from "@angular/core";
import { StoredData } from "../models/stored-data";

@Injectable({
    providedIn: 'root'
})
export class DatabaseLocal {

    public tickets: StoredData[] = [
        new StoredData("Adult Ticket", "", 89.99),
        new StoredData("Child Ticket", "", 59.99)
    ]

    public hotelTypes: StoredData[] = [];
    public hotels: StoredData[] = [
        new StoredData("Hotel 01", "", 2),
        new StoredData("Hotel 02", "", 2)
    ];

    retrieveHotelRooms(hotelID: number): StoredData[] {
        var hotel: StoredData = this.hotels[hotelID];
        var rooms: StoredData[] = [];
        for (let i = hotelID * 1000; i < hotelID * 1000 + hotel.count; i++) {
            rooms.push(this.hotelTypes[i]);
        }
        return rooms;
    }

    getHotelAndRoomFromTypeID(typeID: number) {
        var hotelID: number = Math.floor(typeID / 1000);
        var hotel: StoredData = this.hotels[hotelID];
        var room: StoredData = this.hotelTypes[typeID];
        return {hotel, room};
    }

    constructor() {
        //hotel 1 is between 0 - 999
        this.hotelTypes[0] = new StoredData("Basic Room", "", 108.99)
        this.hotelTypes[1] = new StoredData("Nicer Room", "", 118.99)
        //hotel 2 is between 1000 - 1999
        this.hotelTypes[1000] = new StoredData("Basic Room", "", 108.99)
        this.hotelTypes[1001] = new StoredData("Nicer Room", "", 118.99)
    }

    //in the future directly update this data from a server

}
