/** @type {import("tailwindcss").Config} */
module.exports = {
	content: [
		"./apps/**/*.{js,ts,jsx,tsx,mdx}",
		"./libs/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme:   {
		extend: {
			fontFamily: {
				nunito: ["Nunito", "sans-serif"],
			},
			colors:     {
				primary:   {
					100:     "#8b8c9b",
					200:     "#77798a",
					300:     "#646679",
					400:     "#505369",
					500:     "#3d4058",
					DEFAULT: "#3d4058",
					600:     "#373a4f",
					700:     "#313346",
					800:     "#2b2d3e",
					900:     "#252635",
				},
				secondary: {
					100:     "#f7e0d9",
					200:     "#f6dbd2",
					300:     "#f5d6cc",
					400:     "#f3d1c5",
					500:     "#f2ccbf",
					DEFAULT: "#f2ccbf",
					600:     "#dab8ac",
					700:     "#c2a399",
					800:     "#a98f86",
					900:     "#917a73",
				},
				info: {
					100:     "#f8f7eb",
					200:     "#f7f5e8",
					300:     "#f6f4e5",
					400:     "#f5f2e1",
					500:     "#f4f1de",
					DEFAULT: "#f4f1de",
					600:     "#dcd9c8",
					700:     "#c3c1b2",
					800:     "#aba99b",
					900:     "#929185",
				},
				success:   {
					100:     "#b3d1c2",
					200:     "#a7c9b8",
					300:     "#9ac1ae",
					400:     "#8ebaa4",
					500:     "#81b29a",
					DEFAULT: "#81b29a",
					600:     "#74a08b",
					700:     "#678e7b",
					800:     "#5a7d6c",
					900:     "#4d6b5c",
				},
				error:     {
					100:     "#ecaf9a",
					200:     "#e9a289",
					300:     "#e69579",
					400:     "#e38768",
					500:     "#e07a57",
					DEFAULT: "#e07a57",
					600:     "#ca6e4e",
					700:     "#b36246",
					800:     "#9d553d",
					900:     "#864934",
				},
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("@tailwindcss/forms"),
		require("@tailwindcss/aspect-ratio"),
		require("@tailwindcss/container-queries"),
	],
};

