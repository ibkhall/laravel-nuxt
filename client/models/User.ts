import {Model} from "@/models/Model";

export class User extends Model {

    public $resource(): string {
        return 'users';
    }
}