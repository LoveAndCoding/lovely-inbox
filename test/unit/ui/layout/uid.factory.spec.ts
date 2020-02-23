import {
	getAlwaysUniqueId,
	getItemUniqueId,
	UNSAFE_resetUniqueIdCounters,
} from "src/ui/layout/uid.factory";

describe("UIDFactory", () => {
	describe(".getAlwaysUniqueId", () => {
		beforeEach(() => {
			UNSAFE_resetUniqueIdCounters();
		});

		test("always returns a unique ID with every call", () => {
			// Arrange

			// Act
			const uid1 = getAlwaysUniqueId("test");
			const uid2 = getAlwaysUniqueId("test");
			const uid3 = getAlwaysUniqueId("test");

			// Assert
			expect(uid1).not.toEqual(uid2);
			expect(uid2).not.toEqual(uid3);
			expect(uid3).not.toEqual(uid1);
		});

		test("includes the prefix text in the generated id", () => {
			// Arrange

			// Act
			const uid1 = getAlwaysUniqueId("test");
			const uid2 = getAlwaysUniqueId("test");

			// Assert
			expect(uid1).toMatch(/^test/);
			expect(uid2).toMatch(/^test/);
		});
	});

	describe(".getItemUniqueId", () => {
		beforeEach(() => {
			UNSAFE_resetUniqueIdCounters();
		});

		test("returns the same ID when called with the same item", () => {
			// Arrange
			const obj1 = new Object();
			const obj2 = new Object();

			// Act
			const uid1 = getItemUniqueId(obj1);
			const uid2 = getItemUniqueId(obj1);
			const uid3 = getItemUniqueId(obj2);
			const uid4 = getItemUniqueId(obj2);

			// Assert
			expect(uid1).toEqual(uid2);
			expect(uid3).toEqual(uid4);
			expect(uid1).not.toEqual(uid3);
		});

		test("includes the prefix text only when generating a new id", () => {
			// Arrange
			const obj1 = new Object();

			// Act
			const uid1 = getItemUniqueId(obj1, "test1");
			const uid2 = getItemUniqueId(obj1, "test2");

			// Assert
			expect(uid1).toMatch(/^test1/);
			expect(uid2).toMatch(/^test1/);
			expect(uid1).toEqual(uid2);
		});
	});
});
