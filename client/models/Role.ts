import {Model} from "@tailflow/laravel-orion/lib/model";

export class Role extends Model {

    public $resource(): string {
        return 'roles';
    }
}