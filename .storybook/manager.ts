import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";

const myTheme = create({
	base: "light",
	brandTitle: "🪨 Crystal Melt",
	// brandImage: "https://placehold.co/20x20.png",
});

addons.setConfig({
	theme: myTheme,
});
