import {environment} from '../../../environments/environment';

const api = environment.apiHost;

export const APP_URL = {
  auth: {
    login: api + 'auth/admin-login',
    register: api + 'auth/admin-register',
  },
  cafe: {
    all: api + 'cafes',
    store: api + 'cafes',
    one: api + 'cafes',
    update: api + 'cafes/',
    delete: api + 'cafes/'
  },
  table: {
    all: api + 'tables',
    store: api + 'tables',
    one: api + 'tables',
    update: api + 'tables',
    delete: api + 'tables',
  },
  category: {
    all: api + 'categories',
    store: api + 'categories',
    update: api + 'categories/',
    delete: api + 'categories',
    swap: api + 'categories'
  },
  menu: {
    all: api + 'menus',
    one: api + 'menus/'
  },
  order: {
    all: api + 'orders',
    create: api + 'orders',
    one: api + 'orders'
  },
  dish: {
    all: api + 'dishes',
    one: api + 'dishes',
    create: api + 'dishes',
    update: api + 'dishes',
    delete: api + 'dishes',
    swap: api + 'dishes'
  },
  dishAddition_ingredients: {
    all: api + 'dish-additions',
    one: api + 'dish-additions',
    create: api + 'dish-additions',
    update: api + 'dish-additions',
    delete: api + 'dish-additions'
  }
};
