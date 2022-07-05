# Toggl Track Client (v9)

A TypeScript client for the Toogl Track API (v9). At the moment, only the following API References are supported:

- [`Me`](https://developers.track.toggl.com/docs/api/me)
- [`Time entry`](https://developers.track.toggl.com/docs/api/time_entry)
- [`Invitations`](https://developers.track.toggl.com/docs/api/invitations)
- [`Projects`](https://developers.track.toggl.com/docs/api/projects)
- [`Tags`](https://developers.track.toggl.com/docs/api/tags)
- More to come!

This is a work in progress! Expect breaking changes until version `1.0.0`.

### Install

```bash
npm install toggl-track
```

### Usage

```typescript
import Toggl from 'toggl-track';

const toggl = new Toggl({
  auth: {
    token: process.env?.TOGGL_TRACK_API_TOKEN,
  },
});

const entries = await toggl.timeEntry.list();
console.log(entires);
```
###### Console
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
    "description": "bug fixes for toggl-track typescript package",
    "tags": null,
    "tag_ids": null,
    "duronly": false,
    "at": "2022-07-05T03:32:23+00:00",
    "server_deleted_at": null,
    "user_id": 4232226,
    "uid": 4232226,
    "wid": 2949399,
    "pid": 265931152
  },
  {
    "id": 1555410329,
    "workspace_id": 2949399,
    "project_id": 265931152,
    "task_id": null,
    "billable": false,
    "start": "2022-07-01T17:39:19+00:00",
    "stop": "2022-07-01T18:49:46Z",
    "duration": 4227,
    "description": "implmentation tests",
    "tags": null,
    "tag_ids": null,
    "duronly": false,
    "at": "2022-07-05T03:32:20+00:00",
    "server_deleted_at": null,
    "user_id": 4232226,
    "uid": 6422206,
    "wid": 2949399,
    "pid": 265931152
  },
]
```

Please see the official [Toggl Track API documentation](https://developers.track.toggl.com/docs/) for more information.
