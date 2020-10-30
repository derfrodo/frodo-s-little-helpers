import StringHelper from "./StringHelper";
declare type PathFragment = null | undefined | string | boolean | number;
export declare class PathHelper {
    private _stringHelper;
    constructor(_stringHelper?: StringHelper);
    isValidPathFragment(fragment: PathFragment): fragment is string | number;
    createPath(...pathFragments: PathFragment[]): string;
}
export default PathHelper;
