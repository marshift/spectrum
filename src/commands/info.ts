import { defineCommand } from "../lib/common";
import * as modrinth from "../lib/modrinth";

export default defineCommand({
    name: "info",
    description: "Get info on a Modrinth project. Might be removed later.",
    execute: async (ctx) => {
        const slug = ctx.consumePositionalArg();
        const project = await modrinth.project(slug);

        // TODO: Pretty output
        console.log(project);
    }
})
