export interface ITypeable {
	readonly onFocus?: (event: Event) => void;
	readonly onBlur?: (event: Event) => void;
	readonly onChange?: (value, event: Event) => void;
}

export interface IValidatable {
	readonly checkValidity?: (value: string) => boolean;
	readonly onInvalid?: (value: string) => void;
}

export interface IClickable {
	readonly onPress: (event: Event) => void;
}
