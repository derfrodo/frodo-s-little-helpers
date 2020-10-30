/* eslint-disable @typescript-eslint/no-unused-vars */
import { doBindToClass, doBindPrototype } from "./BindFunctional";
import log from "loglevel";

class TestClassFncBase {
    constructor() {
        doBindToClass(this);
    }
    public val = "test";
    public fooBase(arg: number): string {
        if (this === undefined) {
            throw new Error("This is undefined");
        }
        const val = this.val;
        return `${val}_number_${arg}`;
    }
}

class TestClassFncExt1 extends TestClassFncBase {
    constructor() {
        super();
    }
    public foo(arg: number): string {
        if (this === undefined) {
            throw new Error("This is undefined");
        }
        const val = this.val;
        return `${val}_number_${arg}`;
    }
}

class TestClassFncExt2 extends TestClassFncExt1 {
    constructor() {
        super();
        doBindToClass(this);
        this.val = "constructed";
    }

    public bar(x: number): string {
        if (this === undefined) {
            throw new Error("This is undefined");
        }
        const val = this.val;
        return `${val}_number_${x}`;
    }
}

class TestClassProtoBase {
    public val = "test";
    public fooBase(arg: number): string {
        if (this === undefined) {
            throw new Error("This is undefined");
        }
        const val = this.val;
        return `${val}_number_${arg}`;
    }
}

class TestClassProtoExt1 extends TestClassProtoBase {
    constructor() {
        super();
    }
    public foo(arg: number): string {
        if (this === undefined) {
            throw new Error("This is undefined");
        }
        const val = this.val;
        return `${val}_number_${arg}`;
    }
}

class TestClassProtoExt2 extends TestClassProtoExt1 {
    constructor() {
        super();
        doBindPrototype(this, TestClassProtoExt2.prototype);
        doBindPrototype(this, TestClassProtoBase.prototype);
        this.val = "constructed";
    }

    public bar(x: number): string {
        if (this === undefined) {
            throw new Error("This is undefined");
        }
        const val = this.val;
        return `${val}_number_${x}`;
    }
}
describe("BindFunctional tests", () => {
    describe("TestClassFncExt2 tests: doBindToClass", () => {
        beforeEach(() => {
            log.setLevel("TRACE");
        });

        it("TestClassFncExt2 doBindToClass foo shall fail since not bound", async () => {
            // arrange:
            const clazz = new TestClassFncExt2();
            const array = [1, 2];

            // act
            const result = expect(() => array.map(clazz.foo));

            // assert
            result.toThrowError(new Error("This is undefined"));
        });
        it("TestClassFncExt2 doBindToClass foo shall not fail if lambda", async () => {
            // arrange:
            const clazz = new TestClassFncExt2();
            const array = [1, 2];

            // act
            const result = array.map((n) => clazz.foo(n));

            // assert
            expect(result).toEqual([
                "constructed_number_1",
                "constructed_number_2",
            ]);
        });
        it("TestClassFncExt2 doBindToClass bar shall not fail since bound", async () => {
            // arrange:
            const clazz = new TestClassFncExt2();
            const array = [1, 2];

            // act
            const result = array.map(clazz.bar);

            // assert
            expect(result).toEqual([
                "constructed_number_1",
                "constructed_number_2",
            ]);
        });
        it("TestClassFncExt2 doBindToClass fooBase shall fail since not bound", async () => {
            // arrange:
            const clazz = new TestClassFncExt2();
            const array = [1, 2];

            // act
            const result = () => array.map(clazz.fooBase);

            // assert
            expect(result).toThrowError();
        });
    });

    describe("TestClassProtoExt2 tests: doBindPrototype", () => {
        beforeEach(() => {
            log.setLevel("TRACE");
        });

        it("TestClassProtoExt2 doBindPrototype foo shall fail since not bound", async () => {
            // arrange:
            const clazz = new TestClassProtoExt2();
            const array = [1, 2];

            // act
            const result = expect(() => array.map(clazz.foo));

            // assert
            result.toThrowError(new Error("This is undefined"));
        });
        it("TestClassProtoExt2 doBindPrototype foo shall not fail if lambda", async () => {
            // arrange:
            const clazz = new TestClassProtoExt2();
            const array = [1, 2];

            // act
            const result = array.map((n) => clazz.foo(n));

            // assert
            expect(result).toEqual([
                "constructed_number_1",
                "constructed_number_2",
            ]);
        });
        it("TestClassProtoExt2 doBindPrototype bar shall not fail since bound", async () => {
            // arrange:
            const clazz = new TestClassProtoExt2();
            const array = [1, 2];

            // act
            const result = array.map(clazz.bar);

            // assert
            expect(result).toEqual([
                "constructed_number_1",
                "constructed_number_2",
            ]);
        });
        it("TestClassProtoExt2 doBindPrototype fooBase shall not fail since bound", async () => {
            // arrange:
            const clazz = new TestClassProtoExt2();
            const array = [1, 2];

            // act
            const result = array.map(clazz.fooBase);

            // assert
            expect(result).toEqual([
                "constructed_number_1",
                "constructed_number_2",
            ]);
        });
    });
});
