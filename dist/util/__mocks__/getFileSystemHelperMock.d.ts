import FileSystemHelper from "../FileSystemHelper";
export declare const getFileSystemHelperMock: () => {
    service: FileSystemHelper;
    mock: import("./createMockService").MockedType<FileSystemHelper>;
};
export default getFileSystemHelperMock;
