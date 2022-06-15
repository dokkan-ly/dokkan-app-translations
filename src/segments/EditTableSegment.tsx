import { useState } from "react";
import { useAppNavigator } from "../context/AppNavigator";
import { useAppStore } from "../context/AppStore";
import { CenterContentLayout } from "../layouts/CenterContentLayout";
import { convertTranslationTableToLocalesObject } from "../utils/json";

export function EditTableSegment() {
	const {
		data: { table },
		update,
	} = useAppStore();
	const { goTo } = useAppNavigator();
	const [downloadLink, setDownloadLink] = useState<string>();

	if (!table) return <></>;

	const [head, ...body] = table;

	function onTableEdit(i: number, j: number, value: string) {
		// TODO
		const copy = [...body];
		copy[i][j] = value;

		update("table", [head, ...copy]);
		setDownloadLink("");
	}

	function downloadAsJson() {
		if (!table) return;

		const object = convertTranslationTableToLocalesObject(table);

		const json = JSON.stringify(object);
		const blob = new Blob([json]);
		const url = URL.createObjectURL(blob);

		setDownloadLink(url);
	}

	return (
		<CenterContentLayout axis="horizontal">
			<table>
				<thead className="sticky top-0">
					<tr>
						{head.map((d, i) => (
							<td key={`head_${i}`}>{d}</td>
						))}
					</tr>
				</thead>
				<tbody>
					{body.map((row, i) => (
						<tr key={`row_${i}`}>
							{row.map((d, j) => (
								<td key={`cell_${i}_${j}`}>
									<textarea
										dir={head[j] === "ar" ? "rtl" : "ltr"}
										disabled={j === 0}
										value={d}
										onChange={(event) => onTableEdit(i, j, event.target.value)}
									/>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<button
				className="absolute left-4 bottom-4 p-4 font-sans font-medium bg-red-600 text-red-50 rounded-lg transition-all hover:-translate-y-0.5 hover:bg-red-700 active:translate-y-0.5 active:bg-slate-500"
				onClick={() => goTo("upload")}
			>
				Upload Different CSV
			</button>
			{downloadLink ? (
				<a
					download="translations.json"
					className="absolute right-4 bottom-4 p-4 font-sans font-medium bg-slate-600 text-slate-50 rounded-lg transition-all hover:-translate-y-0.5 hover:bg-slate-700 active:translate-y-0.5 active:bg-slate-500"
					href={downloadLink}
				>
					Download File
				</a>
			) : (
				<button
					className="absolute right-4 bottom-4 p-4 font-sans font-medium bg-slate-600 text-slate-50 rounded-lg transition-all hover:-translate-y-0.5 hover:bg-slate-700 active:translate-y-0.5 active:bg-slate-500"
					onClick={downloadAsJson}
				>
					Prepare for Download
				</button>
			)}
		</CenterContentLayout>
	);
}
