import {environment} from '../../../environments/environment';

const api = environment.apiHost;

export const APP_URL = {
  auth: {
    login: api + 'auth/admin-login'
  },
  cafe: {
    all: api + 'cafes',
    store: api + 'cafes',
    one: api + 'cafes/',
    update: api + 'cafes/',
    delete: api + 'cafes/'
  },
  category: {
    all: api + 'categories',
    store: api + 'categories',
    delete: api + 'categories/'
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
    delete: api + 'dishes'
  }
};
