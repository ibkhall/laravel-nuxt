import {Model as BaseModel} from "@tailflow/laravel-orion/lib/model";
import {Orion} from "@tailflow/laravel-orion/lib/orion";
import {AuthDriver} from '@tailflow/laravel-orion/lib/drivers/default/enums/authDriver';
Orion.init('http://localhost:8000');
Orion.setAuthDriver(AuthDriver.Sanctum);
export class Model<T = Record<string, unknown>> extends BaseModel<T> {

    public $resource(): string {
        return 'items';
    }
}