// argus - marsh's tiny, bad arg parsing library
// ported to TS for use in spectrum

/**
 * 
 * @param {string[]} argv The arguments to parse
 * @param {number} position The position to look up
 * @param {boolean?} required Whether this argument is required, default true
 * @returns {string} The value of the positional argument
 * 
 * NOTE: This function filters out flags, be careful
 */
export function getPositionalArg(argv: string[], position: number, required = true) {
    const argvWithoutFlags = argv.filter((a) => !a.startsWith("-"));
    const value = argvWithoutFlags[position];
    if (!value && required) throw new Error(`Missing argument at position ${position}`);

    return value;
}

/**
 * 
 * @param {string[]} argv The arguments to parse
 * @param {RegExp} condition The expression to match the optional argument, e.g. `/--optional|-o/`
 * @returns {boolean} Whether the given argument has been specified
 */
export const hasOptionalArg = (argv: string[], condition: RegExp) => argv.some(i => condition.test(i));

/**
 * 
 * @param {string[]} argv The arguments to parse
 * @param {RegExp} condition The expression to match the optional argument, e.g. `/--optional|-o/`
 * @returns {string?} The value of the given argument
 */
export function getOptionalArg(argv: string[], condition: RegExp) {
    const argIdx = argv.findIndex(i => condition.test(i));
    if (argIdx === -1) return;

    const splitArg = argv[argIdx].split("=").slice(0, 2);
    if (splitArg.length === 1) throw new Error(`No value passed to argument ${argv[argIdx]}`);

    return splitArg[1];
}

/**
 * 
 * @param {string[]} argv The arguments to parse 
 * @returns {ArgusContext} ArgusContext
 */
export function createContext(argv: string[]): ArgusContext {
    let _posArgIdx = 0;
    
    return {
        argv: argv,
        consumePositionalArg: () => {
            const value = getPositionalArg(argv, _posArgIdx);
            
            _posArgIdx++;
            return value;
        },
        hasOptionalArg: (condition) => hasOptionalArg(argv, condition),
        getOptionalArg: (condition) => getOptionalArg(argv, condition),
    }
}
