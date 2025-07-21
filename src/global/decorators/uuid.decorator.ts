import { v4 as uuidv4 } from 'uuid';
import { BeforeInsert, EventSubscriber, EntitySubscriberInterface } from 'typeorm';

export function GenerateUUID() {
    return function (target: any, propertyKey: string) {
        const originalBeforeInsert = target.constructor.prototype.beforeInsert;
        
        target.constructor.prototype.beforeInsert = function() {
            if (!this.id) {
                this.id = uuidv4();
            }
            if (originalBeforeInsert) {
                originalBeforeInsert.apply(this);
            }
        };
    };
} 