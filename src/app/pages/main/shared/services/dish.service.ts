import {Injectable} from '@angular/core';
import {RequestService} from '../../../../shared/services/request.service';
import {APP_URL} from '../../../../shared/constants/common.url';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(public request: RequestService) {
  }

  getAll(id: any) {
    return this.request.get(`${APP_URL.dish.all}?category_id=${id}`);
  }

  updateDish(id, data) {
    return this.request.post(`${APP_URL.dish.one}/${id}`, data);
  }

  getIndex(id) {
    return this.request.get(`${APP_URL.dish.one}/${id}`);
  }

  createDish(data) {
    return this.request.post(APP_URL.dish.create, data);
  }

  delete(id) {
    return this.request.delete(`${APP_URL.dish.delete}/${id}`);
  }

  swap(id1, id2) {
    return this.request.post(`${APP_URL.dish.swap}/${id1}/${id2}`, {});
  }

  //dish-Ingredients

  getAllIngredients(id: any) {
    return this.request.get(`${APP_URL.dishAddition_ingredients.all}?dish_id=${id}`);
  }

  getOneIngredients(id: any) {
    return this.request.get(`${APP_URL.dishAddition_ingredients.one}/${id}`);
  }

  createIngredients(data) {
    return this.request.post(APP_URL.dishAddition_ingredients.create, data);
  }

  updateIngredients(id, data) {
    return this.request.post(`${APP_URL.dishAddition_ingredients.update}/${id}`, data);
  }

  deleteIngredients(id) {
    return this.request.delete(`${APP_URL.dishAddition_ingredients.delete}/${id}`);
  }
}
