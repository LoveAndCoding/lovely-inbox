import { InvalidEmailAddressError } from "./errors";

interface IEmailAddressParts {
	domain: string;
	fullAddress: string;
	local: string;
	localWithoutTags?: string;
	potentialTags?: string[];
}

export interface IEmailProperties extends IEmailAddressParts {
	name: string;
}

// Regex pulled from MDN to match the <input email /> validation See:
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#Validation
export const EMAIL_VALIDATION_REGEX =
	// NOTE: Because we want this to match exactly, we ignore an eslint error about
	// a redundant escape character. In practice it seems to have no effect
	//
	// eslint-disable-next-line no-useless-escape
	/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export default class Email implements IEmailProperties {
	/**
	 * Split a given email address into its component parts
	 *
	 * @param address The email address to split into parts
	 */
	public static getAddressParts(
		address: string,
		tagMatcher: void | RegExp = /[+-]/,
	): IEmailAddressParts {
		if (!address.match(EMAIL_VALIDATION_REGEX)) {
			throw new InvalidEmailAddressError(address);
		}

		const atIndex = address.lastIndexOf("@");
		const domain = address.substring(atIndex + 1);
		const local = address.substring(0, atIndex);

		let potentialTags: string[] = [];
		let localWithoutTags = local;
		if (tagMatcher) {
			// Some email providers use "+" as a tag delimiter, others use "-"
			potentialTags = local.split(tagMatcher);
			// Remove any "non-tag" part
			localWithoutTags = potentialTags.shift();
		}

		return {
			domain,
			fullAddress: address,
			local,
			localWithoutTags,
			potentialTags,
		};
	}

	/** Full email adddress */
	public readonly fullAddress: string;
	/** Domain part of the email */
	public readonly domain: string;
	/** Local part of the email */
	public readonly local: string;
	/**
	 * Local part of the email without the "potential tags". Because we can't
	 * always be certain if the tags are for sure tags, use with caution
	 */
	public readonly localWithoutTags: string;
	/** Potential sub-address tags included in email address */
	public readonly potentialTags: string[];
	/** Name to be used for this email address */
	public name: string;

	constructor(address: string, name?: string) {
		const { domain, fullAddress, local, localWithoutTags, potentialTags } =
			Email.getAddressParts(address);

		this.fullAddress = fullAddress;
		this.name = name;
		this.domain = domain;
		this.local = local;
		this.localWithoutTags = localWithoutTags;
		this.potentialTags = potentialTags;
	}
}
