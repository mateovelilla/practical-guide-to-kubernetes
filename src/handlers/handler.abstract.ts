import { spawn } from 'node:child_process';

import { type Handler } from "./handler.interface.ts";
import { type Request } from "./request.type.ts";

export abstract class AbstractHandler implements Handler<Request,Request>
{
    private nextHandler: Handler<Request, Request>;

    public setNext(handler: Handler<Request, Request>): Handler<Request, Request> {
        this.nextHandler = handler;
        return handler;
    }
    public runCommand(cmd: string, args: string[] = []) {
        return new Promise<{ stdout: string; stderr: string; code: number }>((resolve, reject) => {
            const child = spawn(cmd, args);
            let stdout = '';
            let stderr = '';
            child.stdout.on('data', (data) => (stdout += data.toString()));
            child.stderr.on('data', (data) => (stderr += data.toString()));
            child.on('error', reject);
            child.on('close', (code) => {
                resolve({ stdout, stderr, code: code ?? 0 });
            });
        });
    }
    public async handle(request?: Request ) {
        if (this.nextHandler) {
            return await this.nextHandler.handle(request);
        }
        return null;
    }
}