const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("returns the event partition key if event has and it's a string value and less than 256 length", () => {
    const event = {
      name: 'deterministicPartitionKey',
      partitionKey: 'partitionKey'
    }

    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe(event.partitionKey);
  });

  it("returns 128 length hash value created using the event if event does not contain partition key", () => {
    const event = {
      name: 'deterministicPartitionKey',
    }
    const expectedResult = '84a72d3f2d0e57d9a6f9f82f44ed98f2a525f290ff6ded3f16141c492fcc8f2dfbea8a3978c5143f5d50552f2b7ebc93bf82e8717de50a62e123573d7de5ea4a'

    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe(expectedResult);
    expect(partitionKey.length).toBe(128);
  });

  it("returns 128 length hash value created using the event partition key if event has and it's a string value but more than 256 length", () => {
    const str = 'partitionKey'
    const event = {
      name: 'deterministicPartitionKey',
      partitionKey: str.padEnd(260, 'y')
    }
    const expectedResult = '47ccfc5435ba9d78c154e32addb6596707740432cef58f188bbd56b2e93534d442734b9415d0293a5c1bed94d6bc2ce5bbb3b83a3bee19bd97003860feaa1cd1';

    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).not.toBe(event.partitionKey);
    expect(partitionKey).toBe(expectedResult);
    expect(partitionKey.length).toBe(128);
  });

  it("returns stringified partition key if event has partition key but it's not a string value and less than 256 length", () => {
    const event = {
      name: 'deterministicPartitionKey',
      partitionKey: {
        name: 'partition1',
        value: 'key1'
      }
    }
    const expectedResult = '{"name":"partition1","value":"key1"}';

    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe(expectedResult);
  });
});
