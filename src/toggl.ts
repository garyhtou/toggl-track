import { Axios } from 'axios';
import { Me } from './me';
import { Tags } from './tags';
import { TimeEntry } from './timeEntry';

export class Toggl {
	public me = new Me(this);
	public tags = new Tags(this);
	public timeEntry = new TimeEntry(this);

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
		const isToken = 'token' in auth;

		const authSecret = isToken
			? `${auth.token}:api_token`
			: `${auth.email}:${auth.password}`;
		const authBase64 = Buffer.from(authSecret).toString('base64');
		const authHeader = `Basic ${authBase64}`;

		return authHeader;
	}
}

export type BasicAuth = {
	email: string;
	password: string;
};
export type ApiToken = { token: string };
export type AuthConfig = BasicAuth | ApiToken;
