import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import * as config from 'config';
const jwtConfig = config.get('jwt')
export const GetUser = createParamDecorator((data, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    const [ , token] = req.headers['authorization'].toString().trim().split(' ');

    try {
        const userInfo = jwt.verify(token, jwtConfig.secretKey);
        return userInfo;
    } catch (err) {
        console.error('Invalid token');
        return null;
    }
});
