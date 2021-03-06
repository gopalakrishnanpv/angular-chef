import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../services/data-storage.service';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<Recipe[]> {

  isAuthenticated: boolean = true;
  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService,
    private authService: AuthService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Recipe[] | any {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
