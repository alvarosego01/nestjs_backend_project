import { Socket } from "socket.io"
import { loginUserData_I } from "../../modules/auth/dto/_ws_updateSession.interface";


interface AddressInfo {
    address: string,
    port: string;
}



// export interface connectedClients_I {
//     [id: string]: {
//         socket: Socket,
//         addressInfo: any
//         // user: User
//     }
// }

export interface connectedClients_I {
    // client_id: string;
    socket: Socket;
    addressInfo: AddressInfo;
    user?: loginUserData_I;
}

