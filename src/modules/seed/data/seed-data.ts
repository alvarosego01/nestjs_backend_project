
export interface seedUser_I {
    name: string;
    lastName: string;
    userName: string;
    email: string;
    pass: string;
    rol: string;
}


export interface SeedRole_I {
    description: string;
    alias: string;
    rol: string;
}



interface SeedData {
    users: seedUser_I[],
    roles: SeedRole_I[];
}


export const seed_initialData: SeedData = {

    users: [
        {
            name: "Alvaro",
            lastName: "Segovia",
            userName: "alvarosego01",
            email: "alvarosego01@gmail.com",
            pass: "Pb_12345",
            rol: "ADMIN_ROLE"
        },
        {
            name: "Luicelis",
            lastName: "Betancourt",
            userName: "lui27",
            email: "luicelis27@gmail.com",
            pass: "Pb_12345",
            rol: "ADMIN_ROLE"
        },
        {
            name: "Agente",
            lastName: "Agente",
            userName: "agent01",
            email: "agent01@gmail.com",
            pass: "Pb_12345",
            rol: "AGENT_ROLE"
        }
    ],
    roles: [

        {
            description: "Usuario por defecto en sistema",
            alias: "Usuario",
            rol: "DEFAULT_ROLE"
        },
        {
            description: "Agente de ventas en sistema",
            alias: "Agente",
            rol: "AGENT_ROLE"
        },
        {
            description: "Administrador en sistema",
            alias: "Administrador",
            rol: "ADMIN_ROLE"
        },

    ]


}



