export interface Handler<Request, Result> {
    setNext(handler: Handler<Request, Result>): Handler<Request,Result>;
    handle(request:Request): Promise<Result>;
}