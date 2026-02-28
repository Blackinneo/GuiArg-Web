// @ts-nocheck
export interface Env {
    DB: D1Database;
}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        if (request.method !== 'POST') {
            return new Response('Method Not Allowed', { status: 405 });
        }

        try {
            const { email } = (await request.json()) as { email: string };

            if (!email || !email.includes('@')) {
                return new Response('Invalid email', { status: 400 });
            }

            await env.DB.prepare(
                'INSERT INTO leads (email) VALUES (?)'
            ).bind(email).run();

            return new Response(JSON.stringify({ success: true }), {
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (error: any) {
            if (error.message.includes('UNIQUE constraint failed')) {
                return new Response(JSON.stringify({ success: true, message: 'Already subscribed' }), {
                    headers: { 'Content-Type': 'application/json' },
                });
            }
            return new Response(error.message, { status: 500 });
        }
    },
};
