import ArrayHelper from "./ArrayHelper";

describe("ArrayHelper tests", () => {
    describe("findFirst tests", () => {
        test("findFirst finds first (even if multiple items matches) item", () => {
            const helper = new ArrayHelper();
            const testArray: string[] = ["test1", "test2", "anotherTest"];
            const testPred: (item: string) => boolean = (i) =>
                i.indexOf("test") === 0;

            const result = helper.findFirst(testArray, testPred);
            expect(result).toBe("test1");
        });
        test("findFirst finds first matching item", () => {
            const helper = new ArrayHelper();
            const testArray: string[] = ["test1", "test2", "anotherTest"];
            const testPred: (item: string) => boolean = (i) =>
                i.indexOf("another") === 0;

            const result = helper.findFirst(testArray, testPred);
            expect(result).toBe("anotherTest");
        });
        test("findFirst finds no matching item if none matches", () => {
            const helper = new ArrayHelper();
            const testArray: string[] = ["test1", "test2", "anotherTest"];
            const testPred: (item: string) => boolean = (i) =>
                i.indexOf("unmatch") === 0;

            const result = helper.findFirst(testArray, testPred);
            expect(result).toBe(undefined);
        });
    });

    describe("findOne tests", () => {
        test("findOne throws error if multiple item matching pred", () => {
            const helper = new ArrayHelper();
            const testArray: string[] = ["test1", "test2", "anotherTest"];
            const testPred: (item: string) => boolean = (i) =>
                i.indexOf("test") === 0;

            const result = () => helper.findOne(testArray, testPred);
            expect(result).toThrowError();
        });
        test("findOne finds first matching item", () => {
            const helper = new ArrayHelper();
            const testArray: string[] = ["test1", "test2", "anotherTest"];
            const testPred: (item: string) => boolean = (i) =>
                i.indexOf("another") === 0;

            const result = helper.findOne(testArray, testPred);
            expect(result).toBe("anotherTest");
        });
        test("findOne throws error if no item matches", () => {
            const helper = new ArrayHelper();
            const testArray: string[] = ["test1", "test2", "anotherTest"];
            const testPred: (item: string) => boolean = (i) =>
                i.indexOf("unmatch") === 0;

            const result = () => helper.findOne(testArray, testPred);
            expect(result).toThrowError();
        });
    });
    describe("contains tests", () => {
        test("contains finds first (even if multiple items matches) item", () => {
            const helper = new ArrayHelper();
            const testArray: string[] = ["test1", "test2", "anotherTest"];
            const testPred: (item: string) => boolean = (i) =>
                i.indexOf("test") === 0;

            const result = helper.contains(testArray, testPred);
            expect(result).toBe(true);
        });
        test("contains finds first matching item", () => {
            const helper = new ArrayHelper();
            const testArray: string[] = ["test1", "test2", "anotherTest"];
            const testPred: (item: string) => boolean = (i) =>
                i.indexOf("another") === 0;

            const result = helper.contains(testArray, testPred);
            expect(result).toBe(true);
        });
        test("contains finds no matching item if none matches", () => {
            const helper = new ArrayHelper();
            const testArray: string[] = ["test1", "test2", "anotherTest"];
            const testPred: (item: string) => boolean = (i) =>
                i.indexOf("unmatch") === 0;

            const result = helper.contains(testArray, testPred);
            expect(result).toBe(false);
        });
    });

    describe("containsOne tests", () => {
        test("containsOne throws error if multiple item matching pred", () => {
            const helper = new ArrayHelper();
            const testArray: string[] = ["test1", "test2", "anotherTest"];
            const testPred: (item: string) => boolean = (i) =>
                i.indexOf("test") === 0;

            const result = helper.containsOne(testArray, testPred);
            expect(result).toBe(false);
        });
        test("containsOne finds first matching item", () => {
            const helper = new ArrayHelper();
            const testArray: string[] = ["test1", "test2", "anotherTest"];
            const testPred: (item: string) => boolean = (i) =>
                i.indexOf("another") === 0;

            const result = helper.containsOne(testArray, testPred);
            expect(result).toBe(true);
        });
        test("containsOne throws error if no item matches", () => {
            const helper = new ArrayHelper();
            const testArray: string[] = ["test1", "test2", "anotherTest"];
            const testPred: (item: string) => boolean = (i) =>
                i.indexOf("unmatch") === 0;

            const result = helper.containsOne(testArray, testPred);
            expect(result).toBe(false);
        });
    });
});
