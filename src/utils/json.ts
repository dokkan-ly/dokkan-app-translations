function _assignKeyPathsToObject(paths: string[], obj: any, value: any = null) {
	const [current, ...remaining] = paths;
	if (remaining.length === 0) {
		obj[current] = value;
		return;
	}
	obj[current] = {};
	_assignKeyPathsToObject(remaining, obj[current], value);
}

export function convertTranslationTableToLocalesObject(table: string[][]) {
	const result: any = {};
	const [[_, ...locales], ...body] = table;

	const keys = body.map((row) => row[0]);
	const keyPaths = keys.map((key) => key.split("."));

	locales.forEach((locale, j) => {
		const translations = {};

		keyPaths.forEach((paths, i) => {
			const value = body[i][j];
			_assignKeyPathsToObject(paths, translations, value);
		});

		result[locale] = translations;
	});

	return result;
}
