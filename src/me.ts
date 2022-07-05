import { ExecOptionsWithStringEncoding } from 'child_process';
import { Toggl } from './toggl';
import { IWorkspaceProject } from './projects';
import { ITag } from './tags';

export class Me {
	constructor(protected toggl: Toggl) {}

	/**
	 * GET Me​
	 * Returns details for the current user.
	 *
	 * https://developers.track.toggl.com/docs/api/me#get-me
	 */
	public async get() {
		return await this.toggl.request<IMe>('me');
	}

	/**
	 * PUT Me​
	 * Updates details for the current user.
	 *
	 * https://developers.track.toggl.com/docs/api/me#put-me
	 */
	public async update(body: {
		beginningOfWeek?: number;
		countryId?: number;
		currentPassword?: string;
		defaultWorkspaceId?: number;
		email?: string;
		fullname?: string;
		password?: string;
		timezone?: string;
	}) {
		return this.toggl.request<IMe>('me', {
			method: 'PUT',
			body: {
				beginning_of_week: body.beginningOfWeek,
				country_id: body.countryId,
				current_password: body.currentPassword,
				default_workspace_id: body.defaultWorkspaceId,
				email: body.email,
				fullname: body.fullname,
				password: body.password,
				timezone: body.timezone,
			},
		});
	}

	/**
	 * GET Clients​
	 * Get Clients.
	 *
	 * https://developers.track.toggl.com/docs/api/me#get-clients
	 */
	public async clients() {
		return this.toggl.request<IClient[]>('me/clients');
	}

	/**
	 * POST CloseAccount​
	 * Close Account
	 *
	 * https://developers.track.toggl.com/docs/api/me#post-closeaccount
	 */
	public async closeAccount() {
		return this.toggl.request('me/close_account', {
			method: 'POST',
		});
	}

	/**
	 * GET Features​
	 * Get features.
	 *
	 * https://developers.track.toggl.com/docs/api/me#get-features
	 */
	public async features() {
		return this.toggl.request<IWorkspaceFeatures[]>('me/features');
	}

	/**
	 * GET User's last known location
	 * Returns the client's IP-based location. If no data is present, empty response will be yielded.
	 *
	 * https://developers.track.toggl.com/docs/api/me#get-users-last-known-location
	 */
	public async location() {
		return this.toggl.request<ILocation>('me/location');
	}

	/**
	 * GET Logged​
	 * Returns whether the current user is logged in or not.
	 *
	 * https://developers.track.toggl.com/docs/api/me#get-logged
	 */
	public async logged() {
		return this.toggl.request('me/logged');
	}

	public lostPassword = {
		/**
		 * GET LostPassword
		 * Verifies the user request to reset the password.
		 *
		 * https://developers.track.toggl.com/docs/api/me#get-logged
		 */
		verify: () => this.toggl.request('me/lost_passwords'),
		/**
		 * POST LostPassword
		 * Handles lost password request confirmation.
		 *
		 * https://developers.track.toggl.com/docs/api/me#get-logged
		 */
		confirm: async (body: {
			code?: string;
			password?: string;
			userId?: number;
		}) => {
			return this.toggl.request('me/lost_passwords/confirm', {
				method: 'POST',
				body: {
					code: body.code,
					password: body.password,
					user_id: body.userId,
				},
			});
		},

		/**
		 * POST LostPassword​
		 * Handles the users request to reset the password.
		 *
		 * https://developers.track.toggl.com/docs/api/me#post-lostpassword-1
		 */
		reset: async (tokenCode: string, body: { email?: string }) => {
			return this.toggl.request(`me/lost_passwords/${tokenCode}`, {
				method: 'POST',
				body: {
					email: body.email,
				},
			});
		},
	};

	/**
	 * GET Organizations that a user is part of​
	 * Get all organizations a given user is part of.
	 *
	 * https://developers.track.toggl.com/docs/api/me#get-organizations-that-a-user-is-part-of
	 */
	public async organizations() {
		return this.toggl.request<IOrganization[]>('me/organizations');
	}

	/**
	 * GET Projects​
	 * Get projects​
	 *
	 * https://developers.track.toggl.com/docs/api/me#get-projects
	 */
	public async projects(query?: { includeArchived?: boolean }) {
		return this.toggl.request<IWorkspaceProject[]>('me/projects', {
			query: {
				include_archived: query?.includeArchived,
			},
		});
	}

	/**
	 * GET ProjectsPaginated​
	 * Get paginated projects.
	 *
	 * https://developers.track.toggl.com/docs/api/me#get-projectspaginated
	 */
	public async projectsPaginated(query?: { startProjectId?: string }) {
		return this.toggl.request<IWorkspaceProject[]>('me/projects/paginated', {
			query: {
				start_project_id: query?.startProjectId,
			},
		});
	}

	/**
	 * GET Tags​
	 * Returns tags for the current user.
	 *
	 * https://developers.track.toggl.com/docs/api/me#get-tags
	 */
	public async tags() {
		return this.toggl.request<ITag[]>('me/tags');
	}

	/**
	 * GET Tasks​
	 * Returns tasks from projects in which the user is participating.
	 *
	 * https://developers.track.toggl.com/docs/api/me#get-tasks
	 */
	public async tasks(query?: {
		since?: Date | string;
		includeNotActive?: boolean;
	}) {
		return this.toggl.request('me/tasks', {
			query: {
				since: query?.since?.toString(),
				include_not_active: query?.includeNotActive,
			},
		});
	}

	/**
	 * GET TrackReminders​
	 * Returns a list of track reminders.
	 *
	 * https://developers.track.toggl.com/docs/api/me#get-trackreminders
	 */
	public async trackReminders() {
		return this.toggl.request('me/track_reminders');
	}

	/**
	 * GET WebTimer​
	 * Get web timer.
	 *
	 * https://developers.track.toggl.com/docs/api/me#get-webtimer
	 */
	public async webTimer() {
		return this.toggl.request('me/web-timer');
	}
}

export interface IMe {
	api_token?: string;
	at: string; // format: date-time
	beginning_of_week: number;
	country_id: number;
	created_at: string; // format: date-time
	default_workspace_id: number;
	email: string; // format: email
	fullname: string;
	id: number;
	image_url: string;
	intercom_hash?: string;
	openid_email: string; // format: email
	openid_enabled: boolean;
	options: any;
	timezone: string;
	updated_at: string; // format: date-time
}

export interface ILocation {
	city: string;
	city_lat_long: string;
	country_code: string;
	country_name: string;
	state: string;
}

export interface IClient {
	id: number;
	wid: number;
	name: string;
	at: string; // format: date-time
}

export interface IFeature {
	feature_id: number;
	name: string;
	enabled: boolean;
}

export interface IWorkspaceFeatures {
	workspace_id: number;
	features: IFeature[];
}

export interface IOrganization {
	id: number;
	name: string;
	pricing_plan_id: number;
	created_at: string; // format: date-time
	at: string; // format: date-time
	server_deleted_at: null | string; // format: date-time
	is_multi_workspace_enabled: boolean;
	suspended_at: null | string; // format: date-time
	user_count: number;
	trial_info: {
		trial: boolean;
		trial_available: boolean;
		trial_end_date: null | string; // format:date-time
		next_payment_date: null | string; // format:date-time
		last_pricing_plan_id: null | number;
	};
	is_chargify: boolean;
	max_workspaces: number;
	admin: boolean;
	owner: boolean;
}
