export default {
	isArray(ary) {
			return Object.prototype.toString.call(ary) === '[object Array]'
		},
		isObject(obj) {
			return Object.prototype.toString.call(obj) === '[object Object]'
		},
		isString(str) {
			return Object.prototype.toString.call(str) === '[object String]'
		},
		isFunction(fn) {
			return Object.prototype.toString.call(fn) === '[object Function]'
		},
		getAjax(url, callback, type) {
			const xhr = new XMLHttpRequest();
			let dataType = (function(a) {
				if (a) {
					return a === 'html' ? 'text' : a;
				} else {
					return 'text';
				}
			})(type);
			xhr.responseType = dataType;
			xhr.open('GET', url, true);
			xhr.send();
			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4 && xhr.status === 200) {
					callback(xhr.responseText)
				}
			}
		}
}