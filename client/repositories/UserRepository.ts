import {Orion} from "@tailflow/laravel-orion/lib/orion";
import {AuthDriver} from '@tailflow/laravel-orion/lib/drivers/default/enums/authDriver';
import {User} from '../models/User'
Orion.init('http://localhost:8000');
Orion.setAuthDriver(AuthDriver.Sanctum);

export default class UserRepository {


    static async all() {
        try {
            await Orion.csrf();
            return await User.$query().get()
        } catch (error) {
            
        }
       
    }

    static async create(model: any) {
        
    }
}