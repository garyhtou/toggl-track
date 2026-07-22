# toggl-track

**A fully-typed TypeScript SDK for the [Toggl Track](https://toggl.com/track/) API (v9).**

Stop hand-rolling HTTP calls, Basic Auth headers, and `any`-typed responses. `toggl-track` wraps time entries, projects, tags, invitations, and your profile with real TypeScript types end to end, and handles Toggl's specific Basic Auth encoding for you.

[![npm version](https://img.shields.io/npm/v/toggl-track.svg)](https://www.npmjs.com/package/toggl-track)
[![npm downloads](https://img.shields.io/npm/dm/toggl-track.svg)](https://www.npmjs.com/package/toggl-track)
[![types included](https://img.shields.io/npm/types/toggl-track.svg)](https://www.npmjs.com/package/toggl-track)
[![license](https://img.shields.io/npm/l/toggl-track.svg)](https://github.com/garyhtou/toggl-track/blob/main/LICENSE)

## Why toggl-track?

- **Fully typed, provably.** Every method, parameter, and response shape ships with TypeScript definitions — see for yourself below.
- **Handles the annoying parts for you.** Toggl's API expects a specific Basic Auth encoding (`token:api_token`) — this library builds it for you.
- **Lightweight.** One dependency ([`axios`](https://www.npmjs.com/package/axios)). No bloated SDK, no generated boilerplate.
- **Promise-based.** Built for `async`/`await` from the ground up — works the same in Node.js scripts, backend services, or serverless functions.
- **MIT licensed and open source.** PRs and issues are welcome.

## Install

```bash
npm install toggl-track
# or
yarn add toggl-track
# or
pnpm add toggl-track
```

## Quick start

Grab your API token from your [Toggl Track profile page](https://track.toggl.com/profile), then:

```typescript
import { Toggl } from 'toggl-track';

const toggl = new Toggl({
  auth: {
    token: process.env.TOGGL_TRACK_API_TOKEN,
  },
});

const entries = await toggl.timeEntry.list();
console.log(entries);

entries[0].id; //          number
entries[0].tags; //         string[] | undefined
entries[0].project_id; //   number
// every field is typed for you — no casting, no guessing
```

<details>
<summary>Example output</summary>

```json
[
  {
    "id": 1555410329,
    "workspace_id": 2949399,
    "project_id": 265931152,
    "task_id": null,
    "billable": false,
    "start": "2022-07-01T23:53:41+00:00",
    "stop": "2022-07-01T23:58:33Z",
    "duration": 292,
    "description": "Fix login redirect bug",
    "tags": ["bug"],
    "tag_ids": [4821093],
    "duronly": false,
    "at": "2022-07-05T03:32:23+00:00",
    "server_deleted_at": null,
    "user_id": 4232226,
    "uid": 4232226,
    "wid": 2949399,
    "pid": 265931152
  }
]
```

</details>

Prefer email/password auth instead? Swap `token` for `email`/`password`:

```typescript
const toggl = new Toggl({
  auth: {
    email: 'you@example.com',
    password: process.env.TOGGL_TRACK_PASSWORD,
  },
});
```

## More examples

**Start a timer:**

```typescript
const entry = await toggl.timeEntry.create(workspaceId, {
  description: 'Writing documentation',
  start: new Date().toISOString(),
  duration: -Math.floor(Date.now() / 1000), // per Toggl's convention: -1 * unix start time = currently running
  created_with: 'my-app',
});
```

**Stop the running timer:**

```typescript
const running = await toggl.timeEntry.current();
if (running) {
  await toggl.timeEntry.stop(running.id, running.workspace_id);
}
```

**Create a project and tag time to it:**

```typescript
const project = await toggl.projects.create(workspaceId, {
  name: 'Website Redesign',
  color: '#06aaf5',
});

await toggl.timeEntry.create(workspaceId, {
  description: 'Homepage mockups',
  project_id: project.id,
  start: new Date().toISOString(),
  duration: -Math.floor(Date.now() / 1000), // currently running
  created_with: 'my-app',
});
```

**List and manage tags:**

```typescript
const tags = await toggl.tags.list(workspaceId);
await toggl.tags.create(workspaceId, { name: 'client-work' });
```

Every method above is fully typed — your editor will autocomplete every parameter and every field on the response.

## Supported resources

| Resource | Docs |
| --- | --- |
| `toggl.me` | [`Me`](https://developers.track.toggl.com/docs/api/me) |
| `toggl.timeEntry` | [`Time entry`](https://developers.track.toggl.com/docs/api/time_entry) |
| `toggl.projects` | [`Projects`](https://developers.track.toggl.com/docs/api/projects) |
| `toggl.tags` | [`Tags`](https://developers.track.toggl.com/docs/api/tags) |
| `toggl.invitations` | [`Invitations`](https://developers.track.toggl.com/docs/api/invitations) |

Missing a resource you need (clients, workspaces, tasks, and more of the Toggl API exist beyond this list)? [Open an issue](https://github.com/garyhtou/toggl-track/issues) or a PR.

## Contributing

Issues and pull requests are genuinely welcome, whether that's a bug fix, a new resource, or better types. See [`development.md`](./development.md) for the release process, and feel free to open an issue first if you want to discuss an approach.

## License

[MIT](./LICENSE) © [Gary Tou](https://garytou.com)
