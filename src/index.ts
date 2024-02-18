import { createContext } from "./lib/argus";
import commands from "./commands";

const ctx = createContext(process.argv.slice(2));
const commandName = ctx.consumePositionalArg();

const command = commands.find((c) => c.name === commandName);
if (!command) throw new Error(`${commandName} is not a registered command`);

try {
    command.execute(ctx);
} catch(e) {
    console.log(`Command ${command.name} encountered an error:`, e)
}
