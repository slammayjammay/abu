browser.runtime.onUserScriptMessage.addListener((message, _, respond) => {
	if (message.action === 'storage:get') {
		browser.storage.local.get(message.args, data => respond(data));
		return true;
	} else if (message.action === 'storage:set') {
		browser.storage.local.set(message.args, () => respond(true));
		return true;
	} else if (message.action === 'storage:remove') {
		browser.storage.local.remove(message.args, () => respond(true));
		return true;
	} else if (message.action === 'notifications:create') {
		browser.notifications?.create(message.args, (...args) => respond(...args));
		return true;
	} else if (message.action === 'email') {
		message.args && email(message.args).then(success => respond(success));
		return true;
	}
});

async function email({ to, subject, body } = {}) {
	console.log(`Emailing "${to}"...`);

	const URL = 'https://backend.violetmetal.xyz/api/users/1/emails/send-now';
	const res = await fetch(URL, {
		method: 'post',
		credentials: 'include',
		body: JSON.stringify({
			secret_password_gobbledeygook: 'jpqan4tobquiegdh980wy4huq3bey9r0gohwkjbrt78q90',
			model: { to, subject, body }
		}),
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
	});

	console.log(`Status: "${res.status}".`);

	return res.status === 200;
}
