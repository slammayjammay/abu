browser.runtime.onUserScriptMessage.addListener((message, _, respond) => {
	if (message.action === 'storage:get') {
		browser.storage.local.get(message.args, data => respond(data));
		return true;
	} else if (message.action === 'storage:set') {
		browser.storage.local.set(message.args, () => respond(true));
		return true;
	} else if (message.action === 'notifications:create') {
		browser.notifications?.create(message.args, (...args) => respond(...args));
		return true;
	}
});
