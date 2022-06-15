import { FileGrab } from "../components/FileGrab";
import { useAppNavigator } from "../context/AppNavigator";
import { useAppStore } from "../context/AppStore";
import { CenterContentLayout } from "../layouts/CenterContentLayout";

export function UploadFileSegment() {
	const { update } = useAppStore();
	const { goTo } = useAppNavigator();
	function updateCsv(csv: string) {
		update("csv", csv);
		goTo("parse");
	}
	return (
		<CenterContentLayout>
			<FileGrab onCsv={updateCsv} />
		</CenterContentLayout>
	);
}
