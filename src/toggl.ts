import { Axios } from 'axios';
import { Me } from './me';

export class Toggl {
	public me = new Me(this);

	private axios: Axios;

	constructor({
		auth,
		baseURL = 'https://api.track.toggl.com/api/v9',
		axiosConfig,
	}: {
		auth: AuthConfig;
		baseURL?: string;
		axiosConfig?: any;
	}) {
		this.axios = new Axios({
			headers: {
				'Content-Type': 'application/json',
				Authorization: this.authHeader(auth),
			},
			baseURL,
			...axiosConfig,
		});
	}

	public async request(
		endpoint: string,
		{
			body,
			query,
			method = 'GET',
			axiosConfig,
		}: {
			body?: object;
			query?: Record<string, string | number | boolean | null | undefined>;
			method?: string;
			axiosConfig?: any;
		} = {}
	) {
		const normalizedQuery: Record<string, string> = {};
		for (const key in query) {
			if (!query.hasOwnProperty(key)) continue;

			const val = query[key];
			if (val === undefined || val === null) continue;

			normalizedQuery[key] = `${val}`; // to string
		}
		const params = new URLSearchParams(normalizedQuery);
		const url = params.keys.length
			? endpoint + `?${params.toString()}`
			: endpoint;

		return this.axios.request({
			url,
			method,
			data: body,
			...axiosConfig,
		});
	}

	private authHeader(auth: AuthConfig) {
		const basicAuth = auth.basicAuth;
		const apiToken = auth.apiToken;

		const authSecret = apiToken
			? `${apiToken}:api_token`
			: `${basicAuth?.email}:${basicAuth?.password}`;
		const authBase64 = Buffer.from(authSecret).toString('base64');
		const authHeader = `Basic ${authBase64}`;

		return authHeader;
	}
}

export type BasicAuth = {
	email: string;
	password: string;
};
export type ApiToken = string;
export type AuthConfig = { basicAuth?: BasicAuth; apiToken?: ApiToken };
