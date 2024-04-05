interface SpectrumCommand {
    name: string;
    description: string;
    execute: (ctx: import("@marshift/argus").ArgusContext) => void;
}

interface SpectrumPack {
    mods: string[];
}
