import { AppNavigator } from "./context/AppNavigator";
import { UploadFileSegment } from "./segments/UploadFileSegment";
import { EditTableSegment } from "./segments/EditTableSegment";
import { AppStoreProvider } from "./context/AppStore";
import { ParseCsvSegment } from "./segments/ParseCsvSegment";
import "./App.css";

function App() {
	return (
		<AppStoreProvider>
			<AppNavigator
				segments={{
					upload: UploadFileSegment,
					parse: ParseCsvSegment,
					edit: EditTableSegment,
				}}
			/>
		</AppStoreProvider>
	);
}

export default App;
