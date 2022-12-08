import {Model} from "@tailflow/laravel-orion/lib/model";

export class User extends Model {

    public $resource(): string {
        return 'users';
    }
}