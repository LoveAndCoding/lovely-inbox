import Email from "src/common/email";

describe("Email", () => {
	describe(".getAddressParts", () => {
		test("simple email is parsed into parts", () => {
			// Arrange
			const validEmail = "kairi@destiny.island";

			// Act
			const {
				domain,
				fullAddress,
				local,
				potentialTags,
			} = Email.getAddressParts(validEmail);

			// Assert
			expect(local).toEqual("kairi");
			expect(domain).toEqual("destiny.island");
			expect(fullAddress).toEqual(validEmail);
			expect(potentialTags).toHaveLength(0);
		});

		test("email with + delimited tags correctly parses tags", () => {
			// Arrange
			const validEmail = "kairi+princess+keyblade@destiny.island";

			// Act
			const {
				domain,
				fullAddress,
				local,
				potentialTags,
			} = Email.getAddressParts(validEmail);

			// Assert
			expect(local).toEqual("kairi+princess+keyblade");
			expect(domain).toEqual("destiny.island");
			expect(fullAddress).toEqual(validEmail);
			expect(potentialTags).toContain("princess");
			expect(potentialTags).toContain("keyblade");
		});

		test("email with - delimited tags correctly parses tags", () => {
			// Arrange
			const validEmail = "kairi-princess-keyblade@destiny.island";

			// Act
			const {
				domain,
				fullAddress,
				local,
				potentialTags,
			} = Email.getAddressParts(validEmail);

			// Assert
			expect(local).toEqual("kairi-princess-keyblade");
			expect(domain).toEqual("destiny.island");
			expect(fullAddress).toEqual(validEmail);
			expect(potentialTags).toContain("princess");
			expect(potentialTags).toContain("keyblade");
		});

		test("invalid email throws error", () => {
			// Arrange
			const invalidEmail = "inval.id";

			expect(() => {
				// Act
				Email.getAddressParts(invalidEmail);
			})
				// Assert
				.toThrowError(`Invalid email address: ${invalidEmail}`);
		});
	});

	describe("#constructor", () => {
		test("valid email is parsed into parts", () => {
			// Arrange
			const validEmail = "kairi@destiny.island";

			// Act
			const email = new Email(validEmail);

			// Assert
			expect(email.fullAddress).toEqual("kairi@destiny.island");
			expect(email.domain).toEqual("destiny.island");
			expect(email.local).toEqual("kairi");
		});
	});
});
