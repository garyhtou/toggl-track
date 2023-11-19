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
		return this.toggl.request<ITimeEntry[]>('me/time_entries', {
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
		return this.toggl.request<ITimeEntry>('me/time_entries/current');
	}

	/**
	 * POST TimeEntries​
	 * Creates a new workspace TimeEntry.
	 *
	 * https://developers.track.toggl.com/docs/api/time_entry#post-timeentries
	 */
	public async create(workspaceId: number, body?: ITimeEntryParams) {
		return this.toggl.request<ITimeEntry>(
			`workspaces/${workspaceId}/time_entries`,
			{
				method: 'POST',
				body,
			}
		);
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
		return this.toggl.request<IUpdateBulkResponse>(
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
		body?: ITimeEntryParams
	) {
		return this.toggl.request<ITimeEntry>(
			`workspaces/${workspaceId}/time_entries/${timeEntryId}`,
			{
				method: 'PUT',
				body,
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

	/**
	 * PATCH TimeEntries​
	 * Stops a workspace time entry.
	 *
	 * https://developers.track.toggl.com/docs/api/time_entries/index.html#patch-stop-timeentry
	 */
	public async stop(timeEntryId: number, workspaceId: number) {
		return this.toggl.request<ITimeEntry>(
			`workspaces/${workspaceId}/time_entries/${timeEntryId}/stop`,
			{
				method: 'PATCH',
			}
		);
	}
}

export interface ITimeEntryParams {
	billable?: boolean;
	created_with?: string;
	description?: string;
	duration?: number;
	duronly?: boolean;
	postedFields?: string[]; // NOTE: Toggl's API docs says the type is 'undefined'
	project_id?: number;
	start?: string;
	start_date?: string;
	stop?: string;
	stop_date?: string;
	tag_action?: string;
	tag_ids?: number[]; // NOTE: Toggl's API docs says the type is 'undefined'
	tags?: string[]; // NOTE: Toggl's API docs says the type is 'undefined'
	task_id?: number;
	user_id?: number;
	workspace_id?: number;
	// pid?: number; // Use `projectId` instead
	// tid?: number; // Use `taskId` instead
	// uid?: number; // Use `userId` instead
	// wid?: number; // Use `workspaceId` instead
}

export interface ITimeEntry {
	at: string;
	billable: boolean;
	description: string;
	duration: number; // DurationInSeconds for running entries should be -1 * (Unix start time).
	duronly: boolean;
	id: number;
	pid: number;
	project_id: number;
	server_deleted_at: string;
	start: string;
	stop: string;
	tag_ids?: number[]; // NOTE: Toggl's API docs does not specify the type
	tags?: string[]; // NOTE: Toggl's API docs does not specify the type
	task_id: number | null;
	tid: number;
	uid: number;
	user_id: number;
	wid: number;
	workspace_id: number;
}

export interface IUpdateBulkResponse {
	failure: any; // NOTE: Toggl's API docs does not specify the type
	success: any; // NOTE: Toggl's API docs does not specify the type
}
