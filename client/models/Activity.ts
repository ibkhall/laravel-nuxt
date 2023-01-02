import {Model} from "@/models/Model";
export class Activity extends Model {

    public $resource(): string {
        return 'activities';
    }
}