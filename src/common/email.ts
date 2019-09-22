import { InvalidEmailAddressError } from "./errors";

interface IEmailAddressParts {
	domain: string;
	fullAddress: string;
	local: string;
	potentialTags?: string[];
}

// Regex pulled from MDN to match the <input email /> validation See:
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#Validation
export const EMAIL_VALIDATION_REGEX = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export default class Email {
	/**
	 * Split a given email address into its component parts
	 *
	 * @param address The email address to split into parts
	 */
	public static getAddressParts(address: string): IEmailAddressParts {
		if (!address.match(EMAIL_VALIDATION_REGEX)) {
			throw new InvalidEmailAddressError(address);
		}

		const atIndex = address.lastIndexOf("@");
		const domain = address.substring(atIndex + 1);
		const local = address.substring(0, atIndex);

		// Some email providers use "+" as a tag delimiter, others use "-"
		const potentialTags = local.split(/[+-]/);
		// Remove any "non-tag" part
		potentialTags.shift();

		return {
			domain,
			fullAddress: address,
			local,
			potentialTags,
		};
	}

	public readonly address: string;
	public readonly domain: string;
	public readonly local: string;
	public readonly potentialTags: string[];
	public readonly name: string;

	constructor(address: string, name?: string) {
		const {
			domain,
			fullAddress,
			local,
			potentialTags,
		} = Email.getAddressParts(address);

		this.address = address;
		this.name = name;
		this.domain = domain;
		this.local = local;
		this.potentialTags = potentialTags;
	}
}
