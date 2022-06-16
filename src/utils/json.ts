import { setProperty } from "dot-prop";

export function convertTranslationTableToLocalesObject(table: string[][]) {
	const [head, ...body] = table;
	const [_, ...locales] = head;

	const result = {};
	locales.forEach((locale, i) => {
		body.forEach((row) => {
			const [path, ...values] = row;
			const value = values[i];
			setProperty(result, `${locale}.${path}`, value);
		});
	});

	return result;
}
