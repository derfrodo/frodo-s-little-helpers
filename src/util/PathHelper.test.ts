import PathHelper from "./PathHelper";

describe("PathHelper tests", () => {
    describe("createPath tests", () => {
        test("createPath joins if last item is slash", () => {
            const helper = new PathHelper();
            const result = helper.createPath("//value", "/");
            expect(result).toBe("//value/");
        });
        test("createPath joins with last item string + slash", () => {
            const helper = new PathHelper();
            const result = helper.createPath("//value", "test/");
            expect(result).toBe("//value/test/");
        });
        test("createPath joins without duping slashes", () => {
            const helper = new PathHelper();
            const result = helper.createPath("//value", "/test");
            expect(result).toBe("//value/test");
        });
        test("createPath ignore empty, last values", () => {
            const helper = new PathHelper();
            const result = helper.createPath("//value", "");
            expect(result).toBe("//value");
        });
        test("createPath remove trailing slash from non-last values, last value empty", () => {
            const helper = new PathHelper();
            const result = helper.createPath("//value///", "");
            expect(result).toBe("//value");
        });
        test("createPath emove trailing slash from non-last values and adds if joined", () => {
            const helper = new PathHelper();
            const result = helper.createPath("//value/", "test");
            expect(result).toBe("//value/test");
        });
        test("createPath ignore non string values", () => {
            const helper = new PathHelper();
            const result = helper.createPath(
                "//value/",
                undefined,
                false,
                true,
                null,
                "test"
            );
            expect(result).toBe("//value/test");
        });
        test("createPath do not add slash in front if first argument is empty", () => {
            const helper = new PathHelper();
            const result = helper.createPath("", "test");
            expect(result).toBe("test");
        });
        test("createPath remove existing slash in front if first argument is empty", () => {
            const helper = new PathHelper();
            const result = helper.createPath("", "/test");
            expect(result).toBe("test");
        });
        test("createPath remove existing slash in front if first argument is non string", () => {
            const helper = new PathHelper();
            const result = helper.createPath(undefined, "/test");
            expect(result).toBe("test");
        });
        test("createPath can deal with number 0", () => {
            const helper = new PathHelper();
            const result = helper.createPath("value", 0, "/test");
            expect(result).toBe("value/0/test");
        });
        test("createPath can deal with leading 0", () => {
            const helper = new PathHelper();
            const result = helper.createPath(0, "/test");
            expect(result).toBe("0/test");
        });
        test("createPath can deal with leading 0", () => {
            const helper = new PathHelper();
            const result = helper.createPath(0, "/test");
            expect(result).toBe("0/test");
        });
    });

    describe("isValidPathFragment tests", () => {
        it("isValidPathFragment recognizes sting as valid path fragment", () => {
            const helper = new PathHelper();
            const testValue = "test";

            const result = helper.isValidPathFragment(testValue);

            expect(result).toBe(true);
        });
        it("isValidPathFragment recognizes number as valid path fragment", () => {
            const helper = new PathHelper();
            const testValue = 10;

            const result = helper.isValidPathFragment(testValue);

            expect(result).toBe(true);
        });
        it("isValidPathFragment recognizes number (0) as valid path fragment", () => {
            const helper = new PathHelper();
            const testValue = 0;

            const result = helper.isValidPathFragment(testValue);

            expect(result).toBe(true);
        });

        it("isValidPathFragment recognizes number (+inf) as valid path fragment", () => {
            const helper = new PathHelper();
            const testValue = Number.POSITIVE_INFINITY;
            const result = helper.isValidPathFragment(testValue);

            expect(result).toBe(true);
        });
        it("isValidPathFragment recognizes function as invalid path fragment", () => {
            const helper = new PathHelper();
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            const testValue = () => undefined;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result = helper.isValidPathFragment(testValue as any);

            expect(result).toBe(false);
        });

        it("isValidPathFragment recognizes boolean as invalid path fragment", () => {
            const helper = new PathHelper();
            const testValue = false;

            const result = helper.isValidPathFragment(testValue);

            expect(result).toBe(false);
        });
        it("isValidPathFragment recognizes boolean (true) as invalid path fragment", () => {
            const helper = new PathHelper();
            const testValue = true;

            const result = helper.isValidPathFragment(testValue);

            expect(result).toBe(false);
        });
        it("isValidPathFragment recognizes undefined as invalid path fragment", () => {
            const helper = new PathHelper();
            const testValue = undefined;

            const result = helper.isValidPathFragment(testValue);

            expect(result).toBe(false);
        });
        it("isValidPathFragment recognizes null as invalid path fragment", () => {
            const helper = new PathHelper();
            const testValue = null;

            const result = helper.isValidPathFragment(testValue);

            expect(result).toBe(false);
        });
    });
});
