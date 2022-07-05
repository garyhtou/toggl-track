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
			this.toggl.request<IUser[]>(`workspaces/${workspaceId}/project_users`),

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
			return this.toggl.request<IUser>(
				`workspaces/${workspaceId}/project_users`,
				{
					method: 'POST',
					body: {
						labour_cost: body?.labourCost,
						manager: body?.manager,
						postedFields: body?.postedFields, // this is camalCase according to the API docs
						project_id: body?.projectId,
						user_id: body?.userId,
					},
				}
			);
		},

		/**
		 * PATCH Patch project users from workspace​
		 * Patch a list of project users for a given workspace.
		 *
		 * https://developers.track.toggl.com/docs/api/projects#patch-patch-project-users-from-workspace
		 */
		set: (workspaceId: number, query: { projectUserIds: number[] }) => {
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
			return this.toggl.request<IUser>(
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
		return this.toggl.request<IWorkspaceProject[]>(
			`workspaces/${workspaceId}/projects`,
			{
				// NOTE: according to Toggl's API docs, everything here is camalCase
				body: body,
			}
		);
	}

	/**
	 * POST WorkspaceProjects​
	 * Create project for given workspace.
	 *
	 * https://developers.track.toggl.com/docs/api/projects#post-workspaceprojects
	 */
	public async create(workspaceId: number, body?: IWorkspaceProjectParams) {
		return this.toggl.request<IWorkspaceProject>(
			`workspaces/${workspaceId}/projects`,
			{
				method: 'POST',
				body: body,
			}
		);
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
		return this.toggl.request<UpdateBulkResponse>(
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
		return this.toggl.request<IWorkspaceProject>(
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
		body?: IWorkspaceProjectParams
	) {
		return this.toggl.request<IWorkspaceProject>(
			`workspaces/${workspaceId}/projects/${projectId}`,
			{
				method: 'POST',
				body: body,
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
}

export interface IWorkspaceProjectParams {
	active?: boolean;
	auto_estimates?: boolean;
	billable?: boolean;
	client_id?: number;
	client_name?: string;
	color?: string;
	currency?: string;
	estimated_hours?: number;
	foreign_id?: string;
	is_private?: boolean;
	name?: string;
	postedFields?: string[]; // NOTE: Toggl's API docs says the type is 'undefined'
	rate_change_mode?: string;
	recurring?: boolean;
	recurring_parameters?: string[]; // NOTE: Toggl's API docs says the type is 'undefined'
	template?: boolean;
	template_id?: number;
	// cid?: number; // Use `clientId` instead
}

export interface IUser {
	at: string;
	gid: number;
	group_id: number;
	id: number;
	labour_cost: number;
	manager: boolean;
	project_id: number;
	user_id: number;
	workspace_id: number;
}

export interface IWorkspaceProject {
	active: boolean;
	actual_bours: number;
	at: string;
	auto_estimates: boolean;
	billable: boolean;
	cid: number;
	client_id: number;
	color: string;
	created_at: string;
	currency: string;
	current_period?: {
		end_date: string;
		start_date: string;
	};
	estimated_hours: number;
	foreign_id?: string;
	id: number;
	is_private: boolean;
	name: string;
	recurring: boolean;
	recurring_parameters: string[]; // NOTE: Toggl's API docs does not specify the type
	server_deleted_at: string;
	template: boolean;
	wid: number;
	workspace_id: number;
}

export interface UpdateBulkResponse {
	failure: any; // NOTE: Toggl's API docs does not specify the type
	success: any; // NOTE: Toggl's API docs does not specify the type
}
