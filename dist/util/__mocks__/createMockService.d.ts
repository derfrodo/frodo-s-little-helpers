/// <reference types="jest" />
export declare type MockedType<TMockedClass> = {
    [key in keyof TMockedClass]: TMockedClass[key] extends (...args: any) => any ? jest.Mock<ReturnType<TMockedClass[key]>, any> : any;
};
export declare const createMockService: <TMockedClass extends {}>(actualService: TMockedClass) => {
    service: TMockedClass;
    mock: MockedType<TMockedClass>;
};
export default createMockService;
