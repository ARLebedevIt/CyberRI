export const routesNavbar = [
  {
    name: 'Биокарта',
    route: '/profile',
    onlyAuth: true,
  },
  {
    name: 'КиберНИИ',
    route: '/lab',
    onlyAuth: false,
  },
  {
    name: 'Товарищи',
    route: '/users',
    onlyAuth: true,
  },
  {
    name: 'Контакты',
    route: '/mail',
    onlyAuth: false,
  },
  
]