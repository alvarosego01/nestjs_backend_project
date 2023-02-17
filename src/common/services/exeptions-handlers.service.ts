import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { _response_I } from '../interfaces';

@Injectable()
export class ExeptionsHandlersService {

    constructor() {

    }

    exceptionEmitHandler(Exception: _response_I) {

        console.log('exepcion normalize', Exception);
        // try {
        if (Exception.statusCode === 400) {
            throw new BadRequestException(Exception.message, {
                cause: Exception.err
            })
        }
        if (Exception.statusCode === 404) {
            // console.log('el mensaje', Exception.message);
            // console.log('el mensaje', Exception.err);
            throw new NotFoundException(Exception.message, {
                cause: Exception.err
            })
        }
        if (Exception.statusCode === 500) {
            throw new InternalServerErrorException(Exception.message, {
                cause: Exception.err
            })
        }
        // } catch (error: any) {

        //     console.log('que coño pasa?', { ...error });
        //     let e: _response_I = error.response;
        //     e.err = null;

        //     // console.log(e.message);

        //     this.exceptionEmitHandler(e);
        // }

    }

}
