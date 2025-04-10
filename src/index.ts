/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		const complexity = parseInt(url.searchParams.get('complexity') ?? '0', 10);

		if (complexity > 10000) {
			return new Response('Stop it.', {status: 418})
		}

		await new Promise(resolve => setTimeout(resolve, complexity))

		return new Response(`You asked for a complexity of ${complexity}, so here you go!`);
	},
} satisfies ExportedHandler<Env>;
