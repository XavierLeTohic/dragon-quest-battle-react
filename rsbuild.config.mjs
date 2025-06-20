import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
	plugins: [pluginReact()],
	html: {
		tags: [
			{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
			{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com' } },
			{ tag: 'link', attrs: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Jersey+10&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap' } },
		],
	},
});
