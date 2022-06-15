function parseRowsIntoCells(row: string) {
	let digest = "";
	let skip = false;
	const cells: string[] = [];
	for (let i = 0; i < row.length; i++) {
		const letter = row[i];
		if (letter === "," && !skip) {
			cells.push(digest);
			digest = "";
			continue;
		}
		if (letter === '"') {
			skip = !skip;
			continue;
		}
		digest += letter;
	}
	if (digest.length > 0) cells.push(digest);
	return cells;
}

function parseCsvIntoRows(csv: string) {
	let digest = "";
	let skip = false;
	const rows: string[] = [];
	for (let i = 0; i < csv.length; i++) {
		const letter = csv[i];
		if (letter === "\n" && !skip) {
			rows.push(digest);
			digest = "";
			continue;
		}
		if (letter === '"') {
			skip = !skip;
		}
		digest += letter;
	}
	if (digest.length > 0) rows.push(digest);
	return rows;
}

export function parseCsvToTable(csv: string) {
	return parseCsvIntoRows(csv).map(parseRowsIntoCells);
}
