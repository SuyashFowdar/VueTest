import Home from './home/home.js';
import About from './about/about.js';
import Todo from './todo/todo.js';
import Item from './todo/item/item.js';
import { setRoutes, setComponent } from "./utils.js";

setComponent(Item);

setRoutes([{
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/about',
    children: [{
        name: 'about',
        path: '/about',
        component: About,
    }, {
        name: 'todo',
        path: '/todo',
        component: Todo,
    }]
}], {
    el: '#app'
});

