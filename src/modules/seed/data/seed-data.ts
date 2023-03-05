
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
            email: "admin@gmail.com",
            pass: "Pb_12345",
            rol: "ADMIN_ROLE"
        },
        {
            name: "Lorena",
            lastName: "Betancourt",
            userName: "lore001",
            email: "artist01@gmail.com",
            pass: "Pb_12345",
            rol: "ARTIST_ROLE"
        },
        {
            name: "Rowan",
            lastName: "Atkinson",
            userName: "row001",
            email: "contratist01@gmail.com",
            pass: "Pb_12345",
            rol: "CONTRATIST_ROLE"
        }
    ],
    roles: [
        {
            description: "Artist role to system",
            alias: "Artista",
            rol: "ARTIST_ROLE"
        },
        {
            description: "Admin role to system",
            alias: "Administrador",
            rol: "ADMIN_ROLE"
        },
        {
            description: "Contratist role to system",
            alias: "Contratista",
            rol: "CONTRATIST_ROLE"
        }
    ]


}



