import { type Handler } from "./handler.interface.ts";
import { type Request } from "./request.type.ts";
export abstract class AbstractHandler implements Handler<Request,Request>
{
    private nextHandler: Handler<Request, Request>;

    public setNext(handler: Handler<Request, Request>): Handler<Request, Request> {
        this.nextHandler = handler;
        return handler;
    }

    public handle(request: Request) {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return null;
    }
}