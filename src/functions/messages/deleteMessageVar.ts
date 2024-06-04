import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "../../util"

export default new NativeFunction({
    name: "$deleteMessageVar",
    version: "2.0.0",
    description: "Deletes a value from a message variable",
    unwrap: true,
    brackets: true,
    args: [
        {
            name: "name",
            description: "The name of the variable",
            rest: false,
            type: ArgType.String,
            required: true,
        },{
            name: "message ID",
            description: "The identifier of the value",
            rest: false,
            type: ArgType.Message,
            required: false,
        }
    ],
    async execute(ctx, [name, message]) {
        await DataBase.delete({name, id: message?.id ?? ctx.message!.id, type: "message"})
        return this.success()
    },
})