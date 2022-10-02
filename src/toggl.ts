import { Axios } from 'axios';
import { Me } from './me';
import { TimeEntry } from './timeEntry';
import { Invitations } from './invitations';
import { Projects } from './projects';
import { Tags } from './tags';

export class Toggl {
	public me = new Me(this);
	public timeEntry = new TimeEntry(this);
	public invitations = new Invitations(this);
	public projects = new Projects(this);
	public tags = new Tags(this);

	private axios: Axios;

	constructor({
		auth,
		baseURL = 'https://api.track.toggl.com/api/v9',
		axiosConfig,
	}: {
		auth: Auth;
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

	public async request<T = unknown>(
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
		const url = Array.from(params).length
			? endpoint + `?${params.toString()}`
			: endpoint;

		const { data } = await this.axios.request<T>({
			url,
			method,
			data: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
			...axiosConfig,
		});

		// Sometimes Axios returns data as a string, rather than parsing it as JSON.
		// This seems to be a bug with Axios???
		if (typeof data === 'string') {
			try {
				return JSON.parse(data as unknown as string);
			} catch (e) {
				// more parse failure
			}
		}

		return data;
	}

	private authHeader(auth: Auth) {
		const isToken = 'token' in auth;

		const authSecret = isToken
			? `${auth.token}:api_token`
			: `${auth.email}:${auth.password}`;
		const authBase64 = Buffer.from(authSecret).toString('base64');
		const authHeader = `Basic ${authBase64}`;

		return authHeader;
	}
}

export interface BasicAuth {
	email: string;
	password: string;
}
export interface ApiToken {
	token: string;
}
export type Auth = BasicAuth | ApiToken;
