// Used for forcing file loader for JS preload file
declare module "file-loader!*" {
	const content: any;
	export default content;
}

declare module "*.css" {
	const content: any;
	export default content;
}

declare module "*.png" {
	const content: any;
	export default content;
}

declare module "*.svg" {
	const content: any;
	export default content;
}
