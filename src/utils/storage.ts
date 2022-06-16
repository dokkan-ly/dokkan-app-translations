export function save(key: string, data: any) {
	localStorage.setItem(key, JSON.stringify(data));
}

export function load<T = any>(key: string): T | null {
	const data = localStorage.getItem(key);
	return data ? (JSON.parse(data) as T) : null;
}

export function loadOrDefault<T = any>(key: string, defaultValue: T): T {
	const data = localStorage.getItem(key);
	if (data) return JSON.parse(data) as T;
	return defaultValue;
}

export function isEmptyObject(obj: any) {
	return (
		obj &&
		Object.keys(obj).length === 0 &&
		Object.getPrototypeOf(obj) === Object.prototype
	);
}
