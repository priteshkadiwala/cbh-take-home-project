const { deterministicPartitionKey } = require('./dpk');

describe('deterministicPartitionKey', () => {
	it('should return the partition key if it exists in the event', () => {
		const event = {
			partitionKey: 'abc',
			data: 'example',
		};
		expect(deterministicPartitionKey(event)).toBe('abc');
	});

	it('should return the partition key if it exists in the event and is not a string', () => {
		const event = {
			partitionKey: { key: 'abc' },
			data: 'example',
		};
		expect(deterministicPartitionKey(event)).toBe('{"key":"abc"}');
	});

	it('should return the sha3-512 hash of the partition key if it is longer than 256 characters', () => {
		const event = {
			partitionKey: 'a'.repeat(257),
			data: 'example',
		};
		expect(deterministicPartitionKey(event)).toBe(
			'5008048b64c14975181175f157be4a780c3d443d2177edf323d57884bc7e3979b9b53bca1325e880df3da0d97c435693441cb5527fbe950f5585678dfbb37785'
		);
	});

	it("should return the sha3-512 hash of the event data if partition key doesn't exist", () => {
		const event = {
			data: 'example',
		};
		expect(deterministicPartitionKey(event)).toBe(
			'1eeac9a5fc3f4c6ec1e089cf4bf4f95144a972940be799c1e4f3c911b10ce4eef2fc5d8314b5289a83828483da07304eaf5d3d49dec7ec4f8aa21c5f5c2d637d'
		);
	});

	it('should return the trivial partition key if event is undefined', () => {
		expect(deterministicPartitionKey()).toBe('0');
	});
});
