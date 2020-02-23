let GLOBAL_ID_COUNTER = 0;

let idMap: WeakMap<Object, string> = new WeakMap();

/**
 * Get a unique ID that is always unique with every call
 *
 * If you need to be able to retrieve this ID later, you must either store it in
 * the calling code, or use the getItemUniqueId instead.
 *
 * @param prefix Prefix for the ID string
 */
export function getAlwaysUniqueId(prefix: string) {
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
export function getItemUniqueId(item: Object, prefix?: string) {
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
export function UNSAFE_resetUniqueIdCounters() {
	idMap = new WeakMap();
	GLOBAL_ID_COUNTER = 0;
}
