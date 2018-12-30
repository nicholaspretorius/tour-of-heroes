import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './app.hero';
import { HEROES } from './app.heroes.mock';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private readonly messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: Fetch Heroes.');
    return of(HEROES);
  }
}
