import {
	ChangeEventHandler,
	DragEventHandler,
	HTMLProps,
	useEffect,
	useRef,
} from "react";

interface Props
	extends Omit<
		HTMLProps<HTMLInputElement>,
		"type" | "onChange" | "multiple" | "className"
	> {
	onCsv?(content: string): void;
}

export function FileGrab({ onCsv, ...props }: Props) {
	const inputRef = useRef<HTMLInputElement>(null);
	const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		if (event.target.files?.length !== 1) return;
		const [file] = event.target.files;
		if (file.type !== "text/csv") return;
		file.text().then(onCsv);
	};
	function onClick() {
		inputRef.current?.click();
	}

	return (
		<div className="file-grab" onClick={onClick}>
			<input
				ref={inputRef}
				className="file-grab"
				multiple={false}
				type="file"
				onChange={onChange}
				{...props}
				name={props.name || "file-grab"}
			/>
			Click or Drag & Drop CSV File
		</div>
	);
}
