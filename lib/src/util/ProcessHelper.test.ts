import ProcessHelper from "./ProcessHelper";

describe("ProcessHelper tests", () => {
    describe("delay tests", () => {
        test("delay delays", async () => {
            const helper = new ProcessHelper();
            let testValue = "0";
            const testFnc = async () => {
                await helper.delay(100);
                testValue = "1";
            };
            const p = testFnc();
            expect(testValue).toBe("0");
            await p;
            expect(testValue).toBe("1");
        });
    });
});
