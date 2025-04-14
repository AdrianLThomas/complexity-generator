const clamp = (n: number, min: number = 0, max: number = 100) => Math.min(100, Math.max(0, n));

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		const complexity = clamp(parseInt(url.searchParams.get('complexity') ?? '0', 10), 0, 5000);
		const errorRate = clamp(parseFloat(url.searchParams.get('error-rate') ?? '0'), 0, 1);

		// simulate error
		if (Math.random() < errorRate) {
			return new Response(`Ouch! You asked for an error rate of ${errorRate}, so you got one!`, {status: 500})
		}

		await new Promise(resolve => setTimeout(resolve, complexity))

		return new Response(`You asked for a complexity of ${complexity}, so here you go!`);
	},
} satisfies ExportedHandler<Env>;
