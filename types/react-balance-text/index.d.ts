/// <reference types="typescript" />

declare module "react-balance-text" {
	import * as React from "react";

	export interface BalanceTextProps {
		children: string | React.ReactElement;
		className?: string;
		resize?: boolean;
		style?: any | any[];
	}

	interface IBalanceTextState {
		visible: boolean;
	}

	let BalanceText: React.ComponentClass<BalanceTextProps, IBalanceTextState>;

	export default BalanceText;
}
