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
        new StoredData("Ocean Breeze Lodge", 
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
         3,["Fermentum odio eu feugiat pretium. In nisl nisi scelerisque eu ultrices vitae auctor eu augue. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus et. Aliquet risus feugiat in ante metus dictum at. Ornare aenean euismod elementum nisi quis eleifend quam. Sed adipiscing diam donec adipiscing tristique risus nec. Et netus et malesuada fames ac. Erat pellentesque adipiscing commodo elit at imperdiet. Sit amet porttitor eget dolor morbi non arcu risus quis."]),
        new StoredData("Sapphire Sands Hotel", 
        "https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1959&q=80", 
        4,["Nulla at volutpat diam ut venenatis tellus in metus. Tellus elementum sagittis vitae et leo duis ut diam quam. Nibh venenatis cras sed felis eget velit aliquet. Sit amet consectetur adipiscing elit duis. Suspendisse ultrices gravida dictum fusce ut. Tincidunt vitae semper quis lectus nulla at volutpat diam ut. Vulputate odio ut enim blandit. Tempor orci eu lobortis elementum nibh tellus molestie. Etiam dignissim diam quis enim."])
    ];

    public restaurantTimes: StoredData[] = [];
    public restaurants: StoredData[] = [
        new StoredData("Sunset Mirage Dining",
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            96,//96 is how many times there are, which is a 24 hour period times 4. This allows for choices every 15 minutes. Not all will be used.
            ["Habitant morbi tristique senectus et. A erat nam at lectus urna duis convallis convallis. Vitae congue eu consequat ac. Quam quisque id diam vel quam elementum pulvinar. Amet consectetur adipiscing elit duis tristique sollicitudin. Vitae semper quis lectus nulla. Vitae auctor eu augue ut lectus arcu. Egestas congue quisque egestas diam in arcu cursus euismod. Elementum pulvinar etiam non quam. Duis at tellus at urna condimentum mattis pellentesque id nibh."]),
        new StoredData("Oceanfront Garden Retreat",
            "https://images.unsplash.com/photo-1526234362653-3b75a0c07438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80",
            96,
            ["Dignissim enim sit amet venenatis urna cursus eget nunc. Sagittis eu volutpat odio facilisis mauris sit amet. Convallis aenean et tortor at. Dui id ornare arcu odio ut sem. Convallis a cras semper auctor neque vitae tempus quam. Amet aliquam id diam maecenas ultricies mi eget mauris pharetra."])
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
        return { hotel, room };
    }

    convertNumberToClock(numberGiven: number): string {
        //each number is 15 minutes.
        var hour: number = Math.floor(numberGiven / 4);
        var minutes: number = (numberGiven / 4 - hour) * 60
        var morning: boolean = true;

        if (hour >= 12) {
            hour -= 12;
            morning = false;
        }

        if (hour == 0) {
            hour = 12;
        }

        if (morning == true) {
            if (minutes < 10) {
                return hour + ":0" + minutes + "AM";
            }
            return hour + ":" + minutes + "AM";
        } else {
            if (minutes < 10) {
                return hour + ":0" + minutes + "PM";
            }
            return hour + ":" + minutes + "PM";
        }
    }

    setHoursForRestaurant(restaurantID: number, startingHour: number, endingHour: number) {
        //if the starting hour is 0
        for (let i = 0; i < this.restaurants[restaurantID].count; i++) {
            if (i >= startingHour * 4 && i < endingHour * 4) {
                this.restaurantTimes[restaurantID * 1000 + i] = new StoredData(this.convertNumberToClock(i), "Open", restaurantID * 1000 + i)
            } else {
                this.restaurantTimes[restaurantID * 1000 + i] = new StoredData(this.convertNumberToClock(i), "Closed", restaurantID * 1000 + i)
            }
        }
    }

    retrieveRestaurantTimes(restaurantID: number): StoredData[] {
        var restaurant: StoredData = this.restaurants[restaurantID];
        var times: StoredData[] = [];
        for (let i = restaurantID * 1000; i < restaurantID * 1000 + restaurant.count; i++) {
            var time: StoredData = this.restaurantTimes[i];
            if (time.extra == "Open") {
                times.push(time);
            }
        }
        return times;
    }

    getRestaurantAndTimeFromTypeID(typeID: number) {
        var restaurantID: number = Math.floor(typeID / 1000);
        var restaurant: StoredData = this.restaurants[restaurantID];
        var time: StoredData = this.restaurantTimes[typeID];
        return { restaurant, time };
    }

    constructor() {
        //hotel 1 is between 0 - 999
        this.hotelTypes[0] = new StoredData("Standard View", "/assets/RoomImages/Hotel02/Room01.avif", 139.99)
        this.hotelTypes[1] = new StoredData("Ocean View", "/assets/RoomImages/Hotel02/Room02.avif", 154.99)
        this.hotelTypes[2] = new StoredData("Bedroom Suite", "/assets/RoomImages/Hotel02/Room03.avif", 624.99)
        //hotel 2 is between 1000 - 1999
        this.hotelTypes[1000] = new StoredData("Standard View", "/assets/RoomImages/Hotel01/Room04.avif", 129.99)
        this.hotelTypes[1001] = new StoredData("Pool View", "/assets/RoomImages/Hotel01/Room04.avif", 139.99)
        this.hotelTypes[1002] = new StoredData("Ocean View", "/assets/RoomImages/Hotel01/Room02.avif", 149.99)
        this.hotelTypes[1003] = new StoredData("King Bed", "/assets/RoomImages/Hotel01/Room01.avif", 164.99)

        this.setHoursForRestaurant(0, 16, 22);
        this.setHoursForRestaurant(1, 11, 22);
    }

    //in the future directly update this data from a server

}
