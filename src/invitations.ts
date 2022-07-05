import { Toggl } from './toggl';

export class Invitations {
	constructor(protected toggl: Toggl) {}

	/**
	 * POST Creates a new invitation for the user​
	 * Creates a new invitation for the user.
	 *
	 * https://developers.track.toggl.com/docs/api/invitations#post-creates-a-new-invitation-for-the-user
	 */
	public async create(
		organizationId: number,
		body?: {
			emails?: string[]; // NOTE: Toggl's API docs says the type is 'undefined'
			workspaces?: number[]; // NOTE: Toggl's API docs says the type is 'undefined'
		}
	) {
		return this.toggl.request<ICreateResponse>(
			`organizations/${organizationId}/invitations`,
			{
				method: 'POST',
				body: {
					emails: body?.emails,
					workspaces: body?.workspaces,
				},
			}
		);
	}
}

export interface ICreateResponse {
	data: any; // NOTE: Toggl's API docs does not specify the type
	messages: any; // NOTE: Toggl's API docs does not specify the type
}
