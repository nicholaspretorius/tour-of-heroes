import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Hero } from './app.hero';
import { HEROES } from './app.heroes.mock';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';
import { getRootView } from '@angular/core/src/render3/instructions';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes'; // heroes api url

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private readonly http: HttpClient,
    private readonly messageService: MessageService,
  ) { }

  getHeroes(): Observable<Hero[]> {

    // return of(HEROES);
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('Fetch Heroes.')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  // https://angular.io/tutorial/toh-pt6#get-hero-by-id does not work for some reason
  // updated to: https://github.com/johnpapa/angular-tour-of-heroes/blob/master/src/app/hero.service.ts
  getHero(id: number): Observable<Hero> {

    const url = `${this.heroesUrl}` + `/` + `${+id}`;

    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
    // return this.getHeroes()
    //   .pipe(map(heroes => heroes.find(hero => hero.id === id)));
    // this.log(`Fetch Hero ${id}`);
    // return of(HEROES.find(hero => hero.id === id));
  }

  updateHero (hero: Hero): Observable<any> {
    const url = this.heroesUrl + '/' + +hero.id;
    return this.http.put(url, hero, this.httpOptions).pipe(
      tap(_ => this.log(`Updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((_hero: Hero) => this.log(`Added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }

  handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log error to console
      this.log(`${operation} failed: ${error.body.message}`);
      return of(result as T);
    };
  }
}
