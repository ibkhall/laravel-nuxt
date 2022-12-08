import {Model} from "@/models/Model";

export class Permission extends Model {

    public $resource(): string {
        return 'permissions';
    }
}