import { Toggl } from './toggl';

export class TimeEntry {
	constructor(protected toggl: Toggl) {}

	/**
	 * GET TimeEntries​
	 * Lists latest time entries.
	 *
	 * https://developers.track.toggl.com/docs/api/time_entry#get-timeentries
	 */
	public async list(query?: {
		before?: string;
		since?: string;
		startDate?: Date | string;
		endDate?: Date | string;
	}) {
		return this.toggl.request('me/time_entries', {
			query: {
				before: query?.before,
				since: query?.since,
				start_date: query?.startDate?.toString(),
				end_date: query?.endDate?.toString(),
			},
		});
	}

	/**
	 * GET Get current time entry​
	 * Load running time entry for user ID.
	 *
	 * https://developers.track.toggl.com/docs/api/time_entry#get-get-current-time-entry
	 */
	public async current() {
		return this.toggl.request('me/time_entries/current');
	}

	/**
	 * POST TimeEntries​
	 * Creates a new workspace TimeEntry.
	 *
	 * https://developers.track.toggl.com/docs/api/time_entry#post-timeentries
	 */
	public async create(workspaceId: number, body?: TimeEntryBody) {
		return this.toggl.request(`workspaces/${workspaceId}/time_entries/`, {
			method: 'POST',
			body: this.formatTimeEntryBody(body),
		});
	}

	/**
	 * PATCH Bulk editing time entries​
	 * In short: http://tools.ietf.org/html/rfc6902 and http://tools.ietf.org/html/rfc6901 with some additions. Patch will be executed partially when there are errors with some records. No transaction, no rollback.
	 *
	 * https://developers.track.toggl.com/docs/api/time_entry#patch-bulk-editing-time-entries
	 */
	public async updateBulk(
		timeEntryIds: number[],
		workspaceId: number,
		body?: {
			op?: string;
			path: string;
		}
	) {
		const timeEntryIdsString = timeEntryIds.join(',');
		return this.toggl.request(
			`workspaces/${workspaceId}/time_entries/${timeEntryIdsString}`,
			{
				method: 'PATCH',
				body,
			}
		);
	}

	/**
	 * PUT TimeEntries​
	 * Updates a workspace time entry.
	 *
	 * https://developers.track.toggl.com/docs/api/time_entry#put-timeentries
	 */
	public async update(
		timeEntryId: number,
		workspaceId: number,
		body?: TimeEntryBody
	) {
		return this.toggl.request(
			`workspaces/${workspaceId}/time_entries/${timeEntryId}`,
			{
				method: 'PUT',
				body: this.formatTimeEntryBody(body),
			}
		);
	}

	/**
	 * DELETE TimeEntries​
	 * Deletes a workspace time entry.
	 *
	 * https://developers.track.toggl.com/docs/api/time_entry#delete-timeentries
	 */
	public async delete(timeEntryId: number, workspaceId: number) {
		return this.toggl.request(
			`workspaces/${workspaceId}/time_entries/${timeEntryId}`,
			{
				method: 'DELETE',
			}
		);
	}

	protected formatTimeEntryBody(body?: TimeEntryBody) {
		return {
			billable: body?.billable,
			created_with: body?.createdWith,
			description: body?.description,
			duration: body?.duration,
			duronly: body?.duronly,
			postedFields: body?.postedFields, // this is camalCase according to the API docs
			project_id: body?.projectId,
			start: body?.start,
			start_date: body?.startDate,
			stop: body?.stop,
			stop_date: body?.stopDate,
			tag_action: body?.tagAction,
			tag_ids: body?.tagIds,
			tags: body?.tags,
			task_id: body?.taskId,
			user_id: body?.userId,
			workspace_id: body?.workspaceId,
		};
	}
}

export type TimeEntryBody = {
	billable?: boolean;
	createdWith?: string;
	description?: string;
	duration?: number;
	duronly?: boolean;
	postedFields?: string[]; // NOTE: Toggl's API docs says the type is 'undefined'
	projectId?: number;
	start?: string;
	startDate?: string;
	stop?: string;
	stopDate?: string;
	tagAction?: string;
	tagIds?: number[]; // NOTE: Toggl's API docs says the type is 'undefined'
	tags?: string[]; // NOTE: Toggl's API docs says the type is 'undefined'
	taskId?: number;
	userId?: number;
	workspaceId?: number;
	// pid?: number; // Use `projectId` instead
	// tid?: number; // Use `taskId` instead
	// uid?: number; // Use `userId` instead
	// wid?: number; // Use `workspaceId` instead
};
