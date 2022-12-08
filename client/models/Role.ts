import {Model} from "@/models/Model";

export class Role extends Model {

    public $resource(): string {
        return 'roles';
    }
}