import {Model} from "@/models/Model";
import {Permission} from "@/models/Permission";
import {Role} from "@/models/Role";
import {BelongsToMany} from "@tailflow/laravel-orion/lib/drivers/default/relations/belongsToMany";
export class User extends Model<{name: string, email: string}> {

    public $resource(): string {
        return 'users';
    }

    public permissions(): BelongsToMany<Permission> {
        return new BelongsToMany(Permission, this);
     }


     public roles(): BelongsToMany<Role> {
        return new BelongsToMany(Role, this);
     }
}