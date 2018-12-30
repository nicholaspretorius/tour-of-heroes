import { Component, OnInit } from '@angular/core';
import { Hero } from './../app.hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  public heroes: Hero[];
  public chosen: Hero;

  constructor(private readonly heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  public getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  public select(hero: Hero) {
    this.chosen = hero;
  }

}
