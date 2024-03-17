import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase, DataType } from "../database"

export default new NativeFunction({
    name: "$deleteCooldown",
    description: "Deletes a cooldown of a given id",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "id",
            description: "The cooldown id you want to delete",
            rest: false,
            type: ArgType.String,
            required: true,
        },{
            name: "type",
            description: "The type of record (ex: global, guild, user etc)",
            rest: false,
            type: ArgType.Enum,
            enum: DataType,
            required: true,
        }
    ],
    async execute(_ctx, [id, type]) {
        if(DataType[type] == 'member' && id.split('_').length != 2) return this.error(Error('The `id` field with the type `member` must follow this format: `userID_guildID`'));
        DataBase.cdDelete(`${id}_${type}`)
        return this.success()
    },
})