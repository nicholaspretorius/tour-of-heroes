import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Hero } from './app.hero';
import { HEROES } from './app.heroes.mock';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes'; // heroes api url

  constructor(
    private readonly http: HttpClient,
    private readonly messageService: MessageService,
  ) { }

  getHeroes(): Observable<Hero[]> {
    this.log('Fetch Heroes.');
    // return of(HEROES);
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      catchError(this.handleError('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    this.log(`Fetch Hero ${id}`);
    return of(HEROES.find(hero => hero._id === id));
  }

  log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log error to console
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
