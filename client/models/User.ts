import {Model} from "@/models/Model";

export class User extends Model<{name: string, email: string}> {

    public $resource(): string {
        return 'users';
    }
}