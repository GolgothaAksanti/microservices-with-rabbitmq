"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseListener = void 0;
class BaseListener {
    constructor(channel, queueName) {
        this.channel = channel;
        this.queueName = queueName;
    }
    listen(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.channel.assertQueue(this.queueName, { durable: true });
            console.log(`[Listener] waiting for event ${this.subject}`);
            this.channel.consume(this.queueName, (msg) => {
                if (msg) {
                    const data = JSON.parse(msg.content.toString());
                    callback(data);
                    this.channel.ack(msg);
                }
            });
        });
    }
}
exports.BaseListener = BaseListener;
