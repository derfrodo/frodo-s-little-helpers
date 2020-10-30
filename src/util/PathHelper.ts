import { BindToClass } from "./BindThis";
import StringHelper from "./StringHelper";

type PathFragment = null | undefined | string | boolean | number;

@BindToClass()
export class PathHelper {
    constructor(private _stringHelper: StringHelper = new StringHelper()) {}

    isValidPathFragment(fragment: PathFragment): fragment is string | number {
        return (
            (typeof fragment === "string" && fragment !== "") ||
            typeof fragment === "number"
        );
    }

    createPath(...pathFragments: PathFragment[]): string {
        if (pathFragments.length === 0) {
            throw new Error(
                "Failed to create path. No fragments has been passed."
            );
        }
        const [rootFragment, ...rest] = pathFragments;

        const base = this.isValidPathFragment(rootFragment)
            ? rootFragment + ""
            : undefined;

        if (rest.length === 0) {
            return typeof base === "string" ? base : "";
        }
        const isEmptyRoot = typeof base !== "string";

        const validPathsRest: string[] = rest
            .filter(
                (r, i) =>
                    this.isValidPathFragment(r) &&
                    (typeof r === "number" ||
                        this._stringHelper.trimStart(r, "/") !== "" ||
                        (i === rest.length - 1 && r !== ""))
            )
            .map((p) => p + "");

        const lastValidPathIsSlash =
            validPathsRest.length > 0 &&
            validPathsRest[validPathsRest.length - 1].lastIndexOf("/") ===
                validPathsRest[validPathsRest.length - 1].length - 1;

        if (!isEmptyRoot && typeof base === "string") {
            return [
                this._stringHelper.trimEnd(base, "/"),
                ...validPathsRest.map((vp) =>
                    this._stringHelper.trimStart(vp, "/")
                ),
            ].join("/");
        } else {
            return [
                ...validPathsRest.map((vp) =>
                    this._stringHelper.trimStart(vp, "/")
                ),
            ].join("/");
        }
    }
}

export default PathHelper;
