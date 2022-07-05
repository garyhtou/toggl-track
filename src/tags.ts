import { Toggl } from './toggl';

export class Tags {
	constructor(protected toggl: Toggl) {}

	/**
	 * GET Tags
	 * List Workspace tags.
	 *
	 * https://developers.track.toggl.com/docs/api/tags#get-tags
	 */
	public async list(workspaceId: number) {
		return this.toggl.request<ITag[]>(`workspaces/${workspaceId}/tags`);
	}

	/**
	 * PUT Update tag​
	 * Update workspace tags.
	 *
	 * https://developers.track.toggl.com/docs/api/tags#put-update-tag
	 */
	public async create(
		workspaceId: number,
		body?: {
			name?: string;
		}
	) {
		return this.toggl.request<ITag>(`workspaces/${workspaceId}/tags`, {
			method: 'POST',
			body: {
				name: body?.name,
			},
		});
	}

	/**
	 * PUT Update tag​
	 * Update workspace tags.
	 *
	 * https://developers.track.toggl.com/docs/api/tags#put-update-tag
	 */
	public async update(
		workspaceId: number,
		tagId: number,
		body?: {
			name?: string;
		}
	) {
		return this.toggl.request<ITag>(`workspaces/${workspaceId}/tags/${tagId}`, {
			method: 'PUT',
			body: {
				name: body?.name,
			},
		});
	}

	/**
	 * DELETE Delete tag​
	 * Delete workspace tags.
	 *
	 * https://developers.track.toggl.com/docs/api/tags#delete-delete-tag
	 */
	public async delete(workspaceId: number, tagId: number) {
		return this.toggl.request(`workspaces/${workspaceId}/tags/${tagId}`, {
			method: 'DELETE',
		});
	}
}

export interface ITag {
	id: number;
	workspace_id: number;
	name: string;
	at: string; // format: date-time
}
