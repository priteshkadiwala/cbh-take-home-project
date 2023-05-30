const crypto = require('crypto');

/**
 * Returns a deterministic partition key based on the given event.
 * If the event has a partition key, it is returned as is.
 * If the event doesn't have a partition key, an sha3-512 hash of the event data is returned.
 * If the event is undefined, a trivial partition key "0" is returned.
 *
 * @param {object} event - The event object.
 * @returns {string} - The deterministic partition key.
 */
exports.deterministicPartitionKey = (event) => {
	let TRIVIAL_PARTITION_KEY = '0';
	const MAX_PARTITION_KEY_LENGTH = 256;

	// Check if the event has a partition key
	if (event && event.partitionKey) {
		let key = event.partitionKey;

		// Check if the partition key is not a string, then stringify it
		if (typeof key !== 'string') {
			key = JSON.stringify(key);
		}

		// Check if the partition key is longer than the limit
		if (key.length > MAX_PARTITION_KEY_LENGTH) {
			// Generate hash using sha3-512 and truncate to desired length
			return crypto.createHash('sha3-512').update(key).digest('hex');
		} else {
			return key;
		}
	}

	// If event exists, generate the hash of event data using sha3-512
	if (event) {
		const data = JSON.stringify(event);
		return crypto.createHash('sha3-512').update(data).digest('hex');
	}

	// Check if the trivial partition key is longer than the limit
	if (TRIVIAL_PARTITION_KEY.length > MAX_PARTITION_KEY_LENGTH) {
		TRIVIAL_PARTITION_KEY = crypto
			.createHash('sha3-512')
			.update(TRIVIAL_PARTITION_KEY)
			.digest('hex');
	}

	// Return the truncated trivial partition key
	return TRIVIAL_PARTITION_KEY;
};
