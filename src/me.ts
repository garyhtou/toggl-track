import { Toggl } from './toggl';

export class Me {
	constructor(protected toggl: Toggl) {}

	/**
	 * GET Me​
	 * Returns details for the current user.
	 *
	 * https://developers.track.toggl.com/docs/api/me#get-me
	 */
	public async get() {
		return this.toggl.request('me');
	}

	/**
	 * PUT Me​
	 * Updates details for the current user.
	 *
	 * https://developers.track.toggl.com/docs/api/me#put-me
	 */
	public async put(body: {
		beginningOfWeek?: number;
		countryId?: number;
		currentPassword?: string;
		defaultWorkspaceId?: number;
		email?: string;
		fullname?: string;
		password?: string;
		timezone?: string;
	}) {
		return this.toggl.request('me', {
			method: 'PUT',
			body: body,
		});
	}

	/**
	 * GET Clients​
	 * Get Clients.
	 *
	 * https://developers.track.toggl.com/docs/api/me#get-clients
	 */
	public async clients() {
		return this.toggl.request('me/clients');
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
		return this.toggl.request('me/features');
	}

	/**
	 * GET User's last known location
	 * Returns the client's IP-based location. If no data is present, empty response will be yielded.
	 *
	 * https://developers.track.toggl.com/docs/api/me#get-users-last-known-location
	 */
	public async location() {
		return this.toggl.request('me/location');
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
		verify: async () => {
			return this.toggl.request('me/lost_passwords');
		},

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
				body,
			});
		},

		/**
		 * POST LostPassword​
		 * Handles the users request to reset the password.
		 *
		 * https://developers.track.toggl.com/docs/api/me#post-lostpassword-1
		 */
		reset: async (loginCode: string, body: { email?: string }) => {
			return this.toggl.request(`me/lost_passwords/${loginCode}`, {
				method: 'POST',
				body,
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
		return this.toggl.request('me/organizations');
	}

	/**
	 * GET Projects​
	 * Get projects​
	 *
	 * https://developers.track.toggl.com/docs/api/me#get-projects
	 */
	public async projects(query?: { includeArchived?: boolean }) {
		return this.toggl.request('me/projects', {
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
		return this.toggl.request('me/projects/paginated', {
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
		return this.toggl.request('me/tags');
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
				includeNotActivei: query?.includeNotActive,
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
