const test = require('node:test');
const assert = require('node:assert/strict');
const { app } = require('../src/app');

async function request(path, options = {}) {
  const server = app.listen(0);
  const { port } = server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${port}${path}`, {
      headers: {
        'content-type': 'application/json',
        ...(options.headers || {})
      },
      ...options
    });

    const body = response.status === 204 ? null : await response.json();
    return { response, body };
  } finally {
    server.close();
  }
}

test('GET /health returns an OK status', async () => {
  const { response, body } = await request('/health');

  assert.equal(response.status, 200);
  assert.equal(body.status, 'ok');
});

test('GET /tasks returns tasks', async () => {
  const { response, body } = await request('/tasks');

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(body));
  assert.ok(body.length > 0);
});

test('GET /tasks/:id returns 404 for an unknown task', async () => {
  const { response, body } = await request('/tasks/999999');

  assert.equal(response.status, 404);
  assert.equal(body.error, 'Task not found');
});

test('GET /tasks?status=todo filters tasks by status', async () => {
  const { response, body } = await request('/tasks?status=todo');

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(body));
  assert.ok(body.every((item) => item.status === 'todo'));
});

test('GET /tasks?status=unknown returns empty array', async () => {
  const { response, body } = await request('/tasks?status=unknown');

  assert.equal(response.status, 200);
  assert.deepEqual(body, []);
test('POST /tasks rejects missing title with 400', async () => {
  const { response, body } = await request('/tasks', {
    method: 'POST',
    body: JSON.stringify({})
  });

  assert.equal(response.status, 400);
  assert.equal(body.error, 'Title is required');
});

test('POST /tasks rejects invalid status with 400', async () => {
  const { response, body } = await request('/tasks', {
    method: 'POST',
    body: JSON.stringify({ title: 'Task test', status: 'invalid-status' })
  });

  assert.equal(response.status, 400);
  assert.equal(body.error, 'Invalid status');
});

test('DELETE /tasks/:id deletes existing task with 204', async () => {
  const { response } = await request('/tasks/1', {
    method: 'DELETE'
  });

  assert.equal(response.status, 204);
});

test('DELETE /tasks/:id returns 404 for unknown task', async () => {
  const { response, body } = await request('/tasks/999999', {
    method: 'DELETE'
  });

  assert.equal(response.status, 404);
  assert.equal(body.error, 'Task not found');
});