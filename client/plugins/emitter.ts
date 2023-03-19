import mitt, { Emitter } from 'mitt'
type Events = {
    onDelete: string;
  };
export default defineNuxtPlugin(() => {
    return {
      provide: {
        emitter: mitt<Events>() as Emitter<Events>
      }
    }
  })