import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './app.hero';
import { HEROES } from './app.heroes.mock';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  getHeroes(): Observable<Hero[]> {
    return of(HEROES);
  }
}
