import utils from './utils.js';
export default class Router {
	constructor(container, routes) {
		this.container = container;
		this.routes = routes;
		this.currenroute = {};
		this.prevroutes = [];
		this.hasPrevState = true;
		this.validator(routes);
	}

	validator(ary) {
		if (utils.isArray(ary)) {
			ary.forEach(route => {
				if (utils.isObject(route)) {
					if (!route.hasOwnProperty('path')) {
						throw new Error('path is nessary for item of routes ');
						return this.routes = [];
					};
					if (!route.hasOwnProperty('page')) {
						throw new Error('page is nessary for item of routes ');
						return this.routes = [];
					}
				}
			});
		} else {
			throw new Error('the seconds arguments is not a array')
		}
	}

	init() {
		window.addEventListener('load', this.hashChange.bind(this), false);
		window.addEventListener('hashchange', this.hashChange.bind(this), false);
	}

	hashChange() {
		let hashCode = window.location.hash.slice(1) || '/';
		this.routes.forEach(route => {
			if (route.path === hashCode) {
				this.container.innerHTML = 'loading';
				utils.getAjax(route.page, data => {
					this.container.innerHTML = '';
					this.container.insertAdjacentHTML('afterbegin', data);
					if (utils.isFunction(route.pageShow)) {
						route.pageShow();
					}
				}, 'html');
				if (this.hasPrevState) {
					this.setPrevRoute(route);
				};
				this.currenroute = route;
				this.setPrevState(true);
			}
		})
	}

	back() {
		let route = this.prevroutes.pop();
		this.setPrevState(false);
	}
	push(route) {
		if (utils.isString(route)) {
			window.location.hash = '#' + route;
		};
		if (utils.isObject(route) && route.hasOwnProperty('path')) {
			this.routes.forEach(item => {
				if (item.path === route.path) {
					item = Object.assign(item, route);
					window.location.hash = '#' + route.path;
				}
			});
		}
	}

	replace(route) {
		this.setPrevState(false);
		if (utils.isString(route)) {
			window.location.hash = '#' + route;
		};
		if (utils.isObject(route) && route.hasOwnProperty('path')) {
			this.routes.forEach(item => {
				if (item.path === route.path) {
					item = Object.assign(item, route);
					window.location.hash = '#' + route.path;
				}
			});
		}
	}

	setPrevState(flag) {
		this.hasPrevState = flag;
	}

	setPrevRoute(route) {
		if (this.currenroute.path === route.path) {
			this.prevroutes.push(this.currenroute);
		}
	}
}