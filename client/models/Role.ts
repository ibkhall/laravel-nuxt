import {Model} from "@/models/Model";
import {BelongsToMany} from "@tailflow/laravel-orion/lib/drivers/default/relations/belongsToMany";
import { Permission } from "@/models/Permission";
export class Role extends Model {

    public $resource(): string {
        return 'roles';
    }

    public permissions(): BelongsToMany<Permission> {
       return new BelongsToMany(Permission, this);
    }
}