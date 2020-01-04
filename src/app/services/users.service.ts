import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users;
  constructor(private http: HttpClient) {}
  getUsers() {
    return this.http.get('https://randomuser.me/api/?results=200')
    .pipe(map( p => p[`results`] ),
    map(pk => {
      return {
        users: pk.map( (pok, i) => {
          return {
            id: ++i,
            name: pok.name.first + ' ' + pok.name.last,
            gender: pok.gender,
            location : pok.location.country,
            email: pok.email,
            age: pok.dob.age,
            image:  pok.picture.thumbnail
          };
        })
      };
    }));
  }
}
