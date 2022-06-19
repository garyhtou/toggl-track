import { Toggl } from './toggl';

export class Projects {
	constructor(protected toggl: Toggl) {}

	public users = {
		/**
		 * GET Get workspace projects users​
		 * List all projects users for a given workspace.
		 *
		 * https://developers.track.toggl.com/docs/api/projects#get-get-workspace-projects-users
		 */
		list: (workspaceId: number) =>
			this.toggl.request(`workspaces/${workspaceId}/project_users`),

		/**
		 * POST Add an user into workspace projects users​
		 * Include a project user for a given workspace.
		 *
		 * https://developers.track.toggl.com/docs/api/projects#post-add-an-user-into-workspace-projects-users
		 */
		add: (
			workspaceId: number,
			body?: {
				labourCost?: number;
				manager?: boolean;
				postedFields?: string[]; // NOTE: Toggl's API docs says the type is 'undefined'
				projectId?: number;
				userId?: number;
			}
		) => {
			return this.toggl.request(`workspaces/${workspaceId}/project_users`, {
				method: 'POST',
				body: {
					labour_cost: body?.labourCost,
					manager: body?.manager,
					postedFields: body?.postedFields, // this is camalCase according to the API docs
					project_id: body?.projectId,
					user_id: body?.userId,
				},
			});
		},

		/**
		 * PATCH Patch project users from workspace​
		 * Patch a list of project users for a given workspace.
		 *
		 * https://developers.track.toggl.com/docs/api/projects#patch-patch-project-users-from-workspace
		 */
		patch: (workspaceId: number, query: { projectUserIds: number[] }) => {
			const projectUserIdsString = query.projectUserIds.join(',');
			return this.toggl.request(`workspaces/${workspaceId}/project_users`, {
				method: 'PATCH',
				query: {
					project_user_ids: projectUserIdsString,
				},
			});
		},

		/**
		 * PUT Update an user into workspace projects users​
		 * Update the data for a project user for a given workspace.
		 *
		 * https://developers.track.toggl.com/docs/api/projects#put-update-an-user-into-workspace-projects-users
		 */
		update: (
			workspaceId: number,
			projectUserId: number,
			body?: {
				labourCost?: number;
				manager?: boolean;
				postedFields?: string[]; // NOTE: Toggl's API docs says the type is 'undefined'
			}
		) => {
			return this.toggl.request(
				`workspaces/${workspaceId}/project_users/${projectUserId}`,
				{
					method: 'PUT',
					body: {
						labour_cost: body?.labourCost,
						manager: body?.manager,
						postedFields: body?.postedFields, // this is camalCase according to the API docs
					},
				}
			);
		},

		/**
		 * DELETE Delete a project user from workspace projects users​
		 * Delete a project user for a given workspace.
		 *
		 * https://developers.track.toggl.com/docs/api/projects#delete-delete-a-project-user-from-workspace-projects-users
		 */
		delete: (workspaceId: number, projectUserId: number) => {
			return this.toggl.request(
				'workspaces/{workspaceId}/project_users/{projectUserId}',
				{ method: 'DELETE' }
			);
		},
	};

	/**
	 * GET WorkspaceProjects​
	 * Get projects for given workspace.
	 *
	 * https://developers.track.toggl.com/docs/api/projects#get-workspaceprojects
	 */
	public async list(
		workspaceId: number,
		body?: {
			active?: boolean;
			billable?: boolean;
			clientId?: number[]; // NOTE: Toggl's API docs says the type is 'undefined'
			groupIds?: number[]; // NOTE: Toggl's API docs says the type is 'undefined'
			name?: string;
			onlyTemplates?: boolean;
			page?: number;
			perPage?: number;
			since?: Date | number;
			sortField?: string;
			uid?: number;
			userIds?: number[]; // NOTE: Toggl's API docs says the type is 'undefined'
			wid?: number;
		}
	) {
		return this.toggl.request(`workspaces/${workspaceId}/projects`, {
			// NOTE: according to Toggl's API docs, everything here is camalCase
			body: {
				active: body?.active,
				billable: body?.billable,
				clientIds: body?.clientId,
				groupIds: body?.groupIds,
				name: body?.name,
				onlyTemplates: body?.onlyTemplates,
				page: body?.page,
				perPage: body?.perPage,
				since: body?.since instanceof Date ? body.since.getTime() : body?.since,
				sortField: body?.sortField,
				uid: body?.uid,
				userIds: body?.userIds,
				wid: body?.wid,
			},
		});
	}

	/**
	 * POST WorkspaceProjects​
	 * Create project for given workspace.
	 *
	 * https://developers.track.toggl.com/docs/api/projects#post-workspaceprojects
	 */
	public async create(workspaceId: number, body?: WorkspaceProjectBody) {
		return this.toggl.request(`workspaces/${workspaceId}/projects`, {
			method: 'POST',
			body: this.formatWorkspaceProjectBody(body),
		});
	}

	/**
	 * PATCH WorkspaceProjects​
	 * Bulk editing workspace projects.
	 *
	 * https://developers.track.toggl.com/docs/api/projects#patch-workspaceprojects
	 */
	public async updateBulk(
		workspaceId: number,
		projectIds: number[],
		body?: {
			op?: string;
			path?: string;
		}
	) {
		const projectIdsString = projectIds.join(',');
		return this.toggl.request(
			`workspaces/${workspaceId}/projects/${projectIdsString}`,
			{
				method: 'PATCH',
				body: {
					op: body?.op,
					path: body?.path,
				},
			}
		);
	}

	/**
	 * GET WorkspaceProject
	 * Get project for given workspace.
	 *
	 * https://developers.track.toggl.com/docs/api/projects#get-workspaceproject
	 */
	public async get(workspaceId: number, projectId: number) {
		return this.toggl.request(
			`workspaces/${workspaceId}/projects/${projectId}`
		);
	}

	/**
	 * POST WorkspaceProject
	 * Post project for given workspace.
	 *
	 * https://developers.track.toggl.com/docs/api/projects#post-workspaceproject
	 */
	public async update(
		workspaceId: number,
		projectId: number,
		body?: WorkspaceProjectBody
	) {
		return this.toggl.request(
			`workspaces/${workspaceId}/projects/${projectId}`,
			{
				method: 'POST',
				body: this.formatWorkspaceProjectBody(body),
			}
		);
	}

	/**
	 * DELETE WorkspaceProject
	 * Delete project for given workspace.
	 *
	 * https://developers.track.toggl.com/docs/api/projects#delete-workspaceproject
	 */
	public async delete(workspaceId: number, projectId: number) {
		return this.toggl.request(
			`workspaces/${workspaceId}/projects/${projectId}`,
			{ method: 'DELETE' }
		);
	}

	protected formatWorkspaceProjectBody(body?: WorkspaceProjectBody) {
		return {
			active: body?.active,
			auto_estimates: body?.auto_estimates,
			billable: body?.billable,
			client_id: body?.clientId,
			client_name: body?.clientName,
			color: body?.color,
			currency: body?.currency,
			estimated_hours: body?.estimatedHours,
			foreign_id: body?.foreignId,
			is_private: body?.isPrivate,
			name: body?.name,
			postedFields: body?.postedFields, // this is camalCase according to the API docs
			recurring: body?.recurring,
			recurring_parameters: body?.recurringParameters,
			template: body?.template,
			template_id: body?.templateId,
		};
	}
}

export type WorkspaceProjectBody = {
	active?: boolean;
	auto_estimates?: boolean;
	billable?: boolean;
	clientId?: number;
	clientName?: string;
	color?: string;
	currency?: string;
	estimatedHours?: number;
	foreignId?: string;
	isPrivate?: boolean;
	name?: string;
	postedFields?: string[]; // NOTE: Toggl's API docs says the type is 'undefined'
	recurring?: boolean;
	recurringParameters?: string[]; // NOTE: Toggl's API docs says the type is 'undefined'
	template?: boolean;
	templateId?: number;
	// cid?: number; // Use `clientId` instead
};
