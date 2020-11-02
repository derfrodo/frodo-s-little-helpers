/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    BindToThis,
    BindToClass,
    bindFunctions,
    FlagForBinding,
} from "./BindThis";

class TestClass {
    public val = "";
    constructor() {
        this.val = "constructed";
    }

    @BindToThis()
    public foo(arg: number): string {
        if (this === undefined) {
            throw new Error("This is undefined");
        }
        const val = this.val;
        return `${val}_number_${arg}`;
    }

    public bar(x: number): string {
        if (this === undefined) {
            throw new Error("This is undefined");
        }
        const val = this.val;
        return `${val}_number_${x}`;
    }
}

class TestClass2 {
    public val = "test";

    constructor() {
        bindFunctions(this);
        this.val = "constructed";
    }

    @FlagForBinding()
    public foo(arg: number): string {
        if (this === undefined) {
            throw new Error("This is undefined");
        }
        const val = this.val;
        return `${val}_number_${arg}`;
    }

    public bar(x: number): string {
        if (this === undefined) {
            throw new Error("This is undefined");
        }
        const val = this.val;
        return `${val}_number_${x}`;
    }
}

class TestClass3 {
    public val = "test";

    constructor() {
        this.val = "constructed";
    }

    @FlagForBinding()
    public foo(arg: number): string {
        if (this === undefined) {
            throw new Error("This is undefined");
        }
        const val = this.val;
        return `${val}_number_${arg}`;
    }

    public bar(x: number): string {
        if (this === undefined) {
            throw new Error("This is undefined");
        }
        const val = this.val;
        return `${val}_number_${x}`;
    }
}

@BindToClass()
class TestClassBase {
    public val = "test";
    public fooBase(arg: number): string {
        if (this === undefined) {
            throw new Error("This is undefined");
        }
        const val = this.val;
        return `${val}_number_${arg}`;
    }
}

class TestClassExt1 extends TestClassBase {
    public foo(arg: number): string {
        if (this === undefined) {
            throw new Error("This is undefined");
        }
        const val = this.val;
        return `${val}_number_${arg}`;
    }
}

@BindToClass()
class TestClassExt2 extends TestClassExt1 {
    constructor() {
        super();
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

describe("BindThis tests", () => {
    describe("TestClass tests: @BindToThis", () => {
        it("Expect TestClass this to be undefined if function has not been bound", async () => {
            // arrange:
            const clazz = new TestClass();
            const array = [1, 2];

            // act
            const result = expect(() => array.map(clazz.bar));

            // assert
            result.toThrowError(new Error("This is undefined"));
        });
        it("Expect TestClass this not to be undefined if (non bound) function is called directly", async () => {
            // arrange:
            const clazz = new TestClass();
            const array = [1, 2];

            // act
            const result = array.map((i) => clazz.bar(i));

            // assert
            expect(result).toEqual([
                "constructed_number_1",
                "constructed_number_2",
            ]);
        });
        it("Expect TestClass this not to be undefined if function has been bound", async () => {
            // arrange:
            const clazz = new TestClass();
            const array = [1, 2];

            // act
            const result = array.map(clazz.foo);

            // assert
            expect(result).toEqual([
                "constructed_number_1",
                "constructed_number_2",
            ]);
        });
        it("Expect TestClass this not to be undefined if (bound) function is called directly", async () => {
            // arrange:
            const clazz = new TestClass();
            const array = [1, 2];

            // act
            const result = array.map((i) => clazz.foo(i));

            // assert
            expect(result).toEqual([
                "constructed_number_1",
                "constructed_number_2",
            ]);
        });
    });
    describe("TestClass2 tests: @FlagForBinding with bindFunctions", () => {
        it("Expect TestClass2 this to be undefined if function has not been flagged for binding", async () => {
            // arrange:
            const clazz = new TestClass2();
            const array = [1, 2];

            // act
            const result = expect(() => array.map(clazz.bar));

            // assert
            result.toThrowError(new Error("This is undefined"));
        });
        it("Expect TestClass2 this not to be undefined if (non flagged for binding) function is called directly", async () => {
            // arrange:
            const clazz = new TestClass2();
            const array = [1, 2];

            // act
            const result = array.map((i) => clazz.bar(i));

            // assert
            expect(result).toEqual([
                "constructed_number_1",
                "constructed_number_2",
            ]);
        });
        it("Expect TestClass2 this not to be undefined if function has been flagged for binding", async () => {
            // arrange:
            const clazz = new TestClass2();
            const array = [1, 2];

            // act
            const result = array.map(clazz.foo);

            // assert
            expect(result).toEqual([
                "constructed_number_1",
                "constructed_number_2",
            ]);
        });
        it("Expect TestClass2 this not to be undefined if (flagged for binding) function is called directly", async () => {
            // arrange:
            const clazz = new TestClass2();
            const array = [1, 2];

            // act
            const result = array.map((i) => clazz.foo(i));

            // assert
            expect(result).toEqual([
                "constructed_number_1",
                "constructed_number_2",
            ]);
        });
    });

    describe("TestClass3 tests: @FlagForBinding without bindFunctions", () => {
        it("Expect TestClass3 this to be undefined if function has not been flagged for binding", async () => {
            // arrange:
            const clazz = new TestClass3();
            const array = [1, 2];

            // act
            const result = expect(() => array.map(clazz.bar));

            // assert
            result.toThrowError(new Error("This is undefined"));
        });
        it("Expect TestClass3 this not to be undefined if (non flagged for binding) function is called directly", async () => {
            // arrange:
            const clazz = new TestClass3();
            const array = [1, 2];

            // act
            const result = array.map((i) => clazz.bar(i));

            // assert
            expect(result).toEqual([
                "constructed_number_1",
                "constructed_number_2",
            ]);
        });
        it("Expect TestClass3 this not to be undefined if function has been flagged for binding, but not bound", async () => {
            // arrange:
            const clazz = new TestClass3();
            const array = [1, 2];

            // act
            const result = expect(() => array.map(clazz.foo));

            // assert
            result.toThrowError(new Error("This is undefined"));
        });
        it("Expect TestClass3 this not to be undefined if (flagged for binding, but not bound) function is called directly", async () => {
            // arrange:
            const clazz = new TestClass3();
            const array = [1, 2];

            // act
            const result = array.map((i) => clazz.foo(i));

            // assert
            expect(result).toEqual([
                "constructed_number_1",
                "constructed_number_2",
            ]);
        });
    });

    describe("TestClassExt2 tests: @Bind", () => {
        it("TestClassExt2 BindToClass foo shall fail since not bound", async () => {
            // arrange:
            const clazz = new TestClassExt2();
            const array = [1, 2];

            // act
            const result = expect(() => array.map(clazz.foo));

            // assert
            result.toThrowError(new Error("This is undefined"));
        });
        it("TestClassExt2 BindToClass foo shall not fail if lambda", async () => {
            // arrange:
            const clazz = new TestClassExt2();
            const array = [1, 2];

            // act
            const result = array.map((n) => clazz.foo(n));

            // assert
            expect(result).toEqual([
                "constructed_number_1",
                "constructed_number_2",
            ]);
        });
        it("TestClassExt2 BindToClass bar shall not fail since bound", async () => {
            // arrange:
            const clazz = new TestClassExt2();
            const array = [1, 2];

            // act
            const result = array.map(clazz.bar);

            // assert
            expect(result).toEqual([
                "constructed_number_1",
                "constructed_number_2",
            ]);
        });
        it("TestClassExt2 BindToClass fooBase shall not fail since bound", async () => {
            // arrange:
            const clazz = new TestClassExt2();
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
