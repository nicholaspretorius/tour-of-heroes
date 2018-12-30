import { Injectable } from '@angular/core';
import { Hero } from './app.hero';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const heroes = [
      { _id: 11, name: 'Mr. Nice' },
      { _id: 12, name: 'Narco' },
      { _id: 13, name: 'Bombasto' },
      { _id: 14, name: 'Celeritas' },
      { _id: 15, name: 'Magneta' },
      { _id: 16, name: 'RubberMan' },
      { _id: 17, name: 'Dynama' },
      { _id: 18, name: 'Dr IQ' },
      { _id: 19, name: 'Magma' },
      { _id: 20, name: 'Tornado' }
    ];
    return { heroes };
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero._id)) + 1 : 11;
  }
}
