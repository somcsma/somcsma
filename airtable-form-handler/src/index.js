/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
*/
async function createAirtableRecord(env, body) {
	try {
		const result = await fetch(
		`https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${encodeURIComponent(env.AIRTABLE_TABLE_NAME)}`,
		{
			method: "POST",
			body: JSON.stringify(body),
			headers: {
			Authorization: `Bearer ${env.AIRTABLE_ACCESS_TOKEN}`,
			"Content-Type": "application/json",
			},
		},
		);
		return result;
	} catch (error) {
		console.error(error);
		return new Response("Failed to connect to Airtable", { status: 502 });
	}
}

async function submitHandler(request, env) {
	try{
		if (request.method !== "POST") {
			return new Response("Method Not Allowed", {
			status: 405,
			});
		}
		const body = await request.formData();
		const data = Object.fromEntries(body); // Store everything in a 'data' object
		const selectedInterests = body.getAll("interest");

		const reqBody = {
			fields: {
				"First Name": data.first_name || "",
				"Last Name": data.last_name || "",
				"Email": data.email || "",
				"Phone": data.phone || "",
				"Interests": selectedInterests
			},
		};
		const airtableRes = await createAirtableRecord(env, reqBody);
		console.log(airtableRes);

		if (!airtableRes.ok) {
			const errorText = await airtableRes.text();
			return new Response(`Airtable Error: ${errorText}`, { status: airtableRes.status });
		}

		return Response.redirect("https://somcsma.org/volunteerSubmit.html", 302);
    } catch (err) {
        return new Response(`Worker Error: ${err.message}`, { status: 500 });
    }
}


export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		if (url.pathname === "/submit" || url.pathname === "/submit/") {
			return await submitHandler(request, env);
		}
		return new Response("Not found at path: " + url.pathname, { status: 404 });
	},
};


