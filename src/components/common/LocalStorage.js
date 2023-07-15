export class LocalStorage {
	dummy = [
		{ title: 'Hello6', content: 'Here comes description in detail.' },
		{ title: 'Hello5', content: 'Here comes description in detail.' },
		{ title: 'Hello4', content: 'Here comes description in detail.' },
		{ title: 'Hello3', content: 'Here comes description in detail.' },
		{ title: 'Hello2', content: 'Here comes description in detail.' },
		{ title: 'Hello1', content: 'Here comes description in detail.' },
	];

	getLocalData = (name) => {
		const data = localStorage.getItem(name);

		if (data) return JSON.parse(data);
		return this.dummy;
	};

	render() {
		return LocalStorage;
	}
}

export default LocalStorage;
