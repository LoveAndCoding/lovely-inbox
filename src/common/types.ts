// Used to slice off the first element in a tuple
// From https://stackoverflow.com/a/55344772
export type Tail<T extends any[]> = ((...x: T) => void) extends (
	h: infer A,
	...t: infer R
) => void
	? R
	: never;
