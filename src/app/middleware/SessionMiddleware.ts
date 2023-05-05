import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { User } from "../../domain/entity/User";

interface Session {
    id: string;
    userEmail: string;
    expiration: number;
    userRole: string;
}

export class SessionMiddleware {
    private readonly secret: string;

    constructor(secret: string) {
        this.secret = secret;
    }

    /**
     * Session middleware that stores the session data
     *
     * @param req
     * @param res
     * @param next
     */
    public session = (req: Request, res: Response, next: NextFunction): any => {
        try {
            const token = req.headers.token;
            const jwtPayload = <any>jwt.verify(token, this.secret, { algorithms: ["HS256"] });
            res.locals.session = <Session>jwtPayload;
            delete res.locals.session.exp;
            const newToken = jwt.sign(res.locals.session, this.secret, { algorithm: "HS256", expiresIn: "1h" });
            res.setHeader("Authorization", newToken);

            next();
        } catch (error) {
            res.locals.session = null;
            next();
            return;
        }
    };

    /**
     * Middleware that checks if user is logged
     *
     * @param req
     * @param res
     * @param next
     */
    public isLogged = (req: Request, res: Response, next: NextFunction): any => {
        const session: Session = res.locals.session;
        if (!session || !session.userEmail) {
            return this.sendForbiddenResponse(res);
        } else {
           next()
        }
    };

    /**
     * Middleware that checks if user is admin
     *
     * @param req
     * @param res
     * @param next
     */
    public isAdmin = (req: Request, res: Response, next: NextFunction): any => {
        const session: Session = res.locals.session;
        console.log(session);
        if (!session) {
            return this.sendForbiddenResponse(res);
        } else if (session.userRole !== "admin") {
            return this.sendUnauthorizedResponse(res);
        } else{
            next()
        }
    };

    public sendUnauthorizedResponse = (res: Response): any => {
        return res.status(401).json({
            error: "Unauthorized",
        });
    };

    public sendForbiddenResponse = (res: Response): any => {
        return res.status(403).json({
            error: "Forbidden",
        });
    };

    /**
     * Get authorization token
     *
     * @param res
     * @param user
     */
    public getAuthorizationToken(res: Response, user: User): string {
        return jwt.sign(
            {
                id: user.id,
                userEmail: user.email,
                expiration: new Date().getTime() + 1440000,
                userRole: user.role,
            } as Session,
            this.secret,
        );
    }

    /**
     * Log out a user by removing its cookie
     *
     * @param res
     */
    public logout(res: Response): any {
        res.cookie("token", null);
    }

}
