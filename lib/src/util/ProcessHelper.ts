export class ProcessHelper {
    async delay(timeoutInMs: number): Promise<void> {
        return await new Promise((r) =>
            setTimeout(r, timeoutInMs !== undefined ? timeoutInMs : 20)
        );
    }
}

export default ProcessHelper;
