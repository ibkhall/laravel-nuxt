import {Model} from "@tailflow/laravel-orion/lib/model";

export class Permission extends Model {

    public $resource(): string {
        return 'permissions';
    }
}