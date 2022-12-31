import mitt from 'mitt'
type Events = {
    onDelete: string;
  };
export default defineNuxtPlugin(() => {
    return {
      provide: {
        emitter: mitt<Events>()
      }
    }
  })