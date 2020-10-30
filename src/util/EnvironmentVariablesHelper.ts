import { BindToClass } from "./BindThis";

@BindToClass()
export class EnvironmentVariablesHelper {
    getEnvironmentVariableValue(
        environmentVariableKey: string
    ): string | undefined {
        return process.env[environmentVariableKey];
    }
}

export default EnvironmentVariablesHelper;
