import { useEffect } from "react";
import { useAppNavigator } from "../context/AppNavigator";
import { useAppStore } from "../context/AppStore";
import { CenterContentLayout } from "../layouts/CenterContentLayout";
import { parseCsvToTable } from "../utils/csv";

export function ParseCsvSegment() {
	const {
		data: { csv },
		update,
	} = useAppStore();
	const { goTo } = useAppNavigator();

	function parseAndSaveCsv() {
		if (!csv) return;
		update("table", parseCsvToTable(csv));
		goTo("edit");
	}

	useEffect(() => {
		parseAndSaveCsv();
	}, []);

	return (
		<CenterContentLayout>
			<h2 className="please-wait">Please wait..</h2>
		</CenterContentLayout>
	);
}
