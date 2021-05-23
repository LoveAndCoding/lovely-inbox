import { request } from "../../communication/ipc";

const qsparams = new URLSearchParams(document.location.search.substring(1));

// Insert in the username if we have it in the querystring
const usernameSpot = document.getElementById("username-spot");
const username = qsparams.get("username");
if (username) {
	usernameSpot.textContent = ` ${username}`;
}

// Setup the close buttons to close the window
const closeBtns = Array.from(
	document.getElementsByClassName(
		"close-btn",
	) as HTMLCollectionOf<HTMLButtonElement>,
);
closeBtns.forEach((btn) => btn.addEventListener("click", () => window.close()));

// Setup form submission
const form = document.getElementById("password-form");
const passwordInput = document.getElementById(
	"password-field",
) as HTMLInputElement;
const saveCheckbox = document.getElementById(
	"save-password",
) as HTMLInputElement;
const submitBtn = document.getElementById("submit-btn") as HTMLButtonElement;
const challengeId: number = parseInt(qsparams.get("challengeId"));

const disableableElements: Array<HTMLInputElement | HTMLButtonElement> = [
	passwordInput,
	saveCheckbox,
	submitBtn,
	...closeBtns,
];

form.addEventListener("submit", (e) => {
	const password = passwordInput.value;
	const toSave = !!saveCheckbox.checked;

	disableableElements.forEach((el) => (el.disabled = true));

	request("/auth/plain/submit", challengeId, password, toSave).then(
		(success) => {
			if (success) {
				window.close();
			} else {
				disableableElements.forEach((el) => (el.disabled = false));
				passwordInput.focus();
				passwordInput.setCustomValidity(
					"Unable to connect with the given password",
				);
			}
		},
	);

	e.preventDefault();
	return false;
});
