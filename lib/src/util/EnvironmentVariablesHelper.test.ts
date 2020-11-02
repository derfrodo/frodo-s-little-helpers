import EnvironmentVariablesHelper from "./EnvironmentVariablesHelper";

const origEnv = process.env;
describe("EnvironmentVariablesHelper tests", () => {
    afterEach(() => {
        process.env = origEnv;
    });

    beforeEach(() => {
        process.env = { ...(origEnv || {}) };
    });

    describe("getEnvironmentVariableValue tests", () => {
        it("getEnvironmentVariableValue finds defined env var", () => {
            const helper = new EnvironmentVariablesHelper();
            process.env["ENV_VAR_KEY"] = "ENV_VAR_VALUE";

            const result = helper.getEnvironmentVariableValue("ENV_VAR_KEY");

            expect(result).toBe("ENV_VAR_VALUE");
        });
        it("getEnvironmentVariableValue returns undefind if env var is not defined", () => {
            const helper = new EnvironmentVariablesHelper();

            const result = helper.getEnvironmentVariableValue(
                "ENV_VAR_KEY_EnvironmentVariablesHelper_Test"
            );

            expect(result).toBe(undefined);
        });
    });
});
