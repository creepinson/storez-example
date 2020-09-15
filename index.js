const { MemoryStore } = require("@throw-out-error/storez");
const { concatMap, flatMap, delay } = require("rxjs/operators");
const { of } = require("rxjs");

async function main() {
	const store = new MemoryStore();
	const users = store.col("user");
	users.data = require("./data");

	console.log(`Fetching data from collection: ${users.name}`);

	users
		.fetchEntries()
		.pipe(
			flatMap((entries) => entries),
			concatMap((x) => of(x).pipe(delay(1000))),
		)
		.subscribe((data) => console.log(data));
}

main();
