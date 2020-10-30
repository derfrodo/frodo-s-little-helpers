/* eslint-disable @typescript-eslint/no-explicit-any */
import FileSystemHelper from "../FileSystemHelper";
import createMockService from "./createMockService";

jest.mock("../FileSystemHelper");
export const getFileSystemHelperMock = () => {
    return createMockService(
        new (FileSystemHelper as any)() as FileSystemHelper
    );
};

export default getFileSystemHelperMock;
