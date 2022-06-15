import { PropsWithChildren } from "react";
interface Props {
	axis?: "horizontal" | "vertical";
}
export function CenterContentLayout({
	children,
	axis,
}: PropsWithChildren<Props>) {
	if (axis === "horizontal")
		return (
			<div className="h-full w-full flex flex-col items-center">{children}</div>
		);
	if (axis === "vertical")
		return (
			<div className="h-full w-full flex flex-col justify-center">
				{children}
			</div>
		);
	return (
		<div className="h-full w-full flex items-center justify-center">
			{children}
		</div>
	);
}
