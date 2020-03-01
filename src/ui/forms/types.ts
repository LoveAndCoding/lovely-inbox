import * as React from "react";

export interface ITypeable<ElementType = HTMLInputElement> {
	readonly onFocus?: (event: React.FormEvent<ElementType>) => void;
	readonly onBlur?: (event: React.FormEvent<ElementType>) => void;
	readonly onChange?: (
		value: string,
		event: React.ChangeEvent<ElementType>,
	) => void;
}

export interface IValidatable<ValueType = string> {
	readonly checkValidity?: (value: ValueType) => boolean;
	readonly onInvalid?: (value: ValueType) => void;
}

export interface IClickable<ElementType = Element> {
	readonly onPress?: (event: React.MouseEvent<ElementType>) => void;
}
