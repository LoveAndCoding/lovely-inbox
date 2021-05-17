let GLOBAL_ID_COUNTER = 0;

// This is a WeakMap and we do not access the keys, so `object` is the right
// type here, but eslint doesn't like it. So disable the error.
// eslint-disable-next-line @typescript-eslint/ban-types
let idMap: WeakMap<object, string> = new WeakMap();

/**
 * Get a unique ID that is always unique with every call
 *
 * If you need to be able to retrieve this ID later, you must either store it in
 * the calling code, or use the getItemUniqueId instead.
 *
 * @param prefix Prefix for the ID string
 */
export function getAlwaysUniqueId(prefix: string): string {
	return `${prefix}-${++GLOBAL_ID_COUNTER}`;
}

/**
 * Get a Unique ID for a given item.
 *
 * Note that this ID will be unique, but will also be associated with the item
 * passed in. Multiple calls to this function with the same item will return
 * the same ID.
 *
 * If you need an ID that will be different for each call, see getAlwaysUniqueId
 *
 * @param item Item you want to get ID for; Must be a non-null Object
 * @param prefix Prefix for the ID string iff generating a new ID (Default 'global-item')
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function getItemUniqueId(item: object, prefix?: string): string {
	if (!idMap.has(item)) {
		// If we don't have an ID already, generate one
		idMap.set(item, getAlwaysUniqueId(prefix || "global-item"));
	}

	return idMap.get(item);
}

/**
 * This resets all unique ID counters to their initial state
 *
 * WARNING: This is marked as unsafe because it is! Do not call unless you know
 * what you are doing. The primary use case for this is snapshot tests and the
 * like that require predictable IDs no matter the order tests are run in.
 */
export function UNSAFE_resetUniqueIdCounters(): void {
	idMap = new WeakMap();
	GLOBAL_ID_COUNTER = 0;
}
