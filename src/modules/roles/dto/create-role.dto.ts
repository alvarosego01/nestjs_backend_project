import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsIn, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateRoleDto {


    @ApiProperty({
        description: 'Description about role',
        nullable: false,
        example: 'General description of the user role in the system and its functions',
        minLength: 10,
    })
    @IsNotEmpty({
        message(validationArguments) {
            return `La descripción de rol es requerida {{${validationArguments.property}}}`;
        },
    })
    @IsString({
        message(validationArguments) {
            return `La descripción de rol debe ser un string {{${validationArguments.property}}}`;
        },
    })
    @MinLength(10, {
        message(validationArguments) {
            return `La descripción de rol debe tener un minimo de 10 caracteres {{${validationArguments.property}}}`;
        },
    })
    description: string;

    @ApiProperty({
        description: 'Alias role',
        nullable: false,
        example: 'Artist | Contratist | Administrator'
    })
    @IsNotEmpty({
        message(validationArguments) {
            return `El alias de rol es requerido {{${validationArguments.property}}}`;
        },
    })
    @IsString({
        message(validationArguments) {
            return `El alias de rol debe ser un string {{${validationArguments.property}}}`;
        },
    })
    alias: string;

    @ApiProperty({
        description: 'Role tag name',
        nullable: false,
        example: 'DEFAULT_ROLE | ADMIN_ROLE | ARTIST_ROLE | CONTRATIST_ROLE',
        enum: [
            'DEFAULT_ROLE',
            'ADMIN_ROLE',
            'ARTIST_ROLE',
            'CONTRATIST_ROLE',
        ]
    })
    @IsNotEmpty({
        message(validationArguments) {
            return `El tag del rol es requerido {{${validationArguments.property}}}`;
        },
    })
    @IsIn([
        'DEFAULT_ROLE',
        'ADMIN_ROLE',
        'ARTIST_ROLE',
        'CONTRATIST_ROLE',
    ], {
        message(validationArguments) {
            return `El tag del rol no es válido o permitido {{${validationArguments.property}}}`;
        },
    })
    rol: string

}
