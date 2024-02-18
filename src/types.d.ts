interface ArgusContext {
    argv: string[];
    consumePositionalArg: () => string;
    hasOptionalArg: (condition: RegExp) => boolean;
    getOptionalArg: (condition: RegExp) => string | undefined;
}

interface SpectrumCommand {
    name: string;
    description: string;
    execute: (ctx: ArgusContext) => void;
}

interface SpectrumPack {
    mods: string[];
}