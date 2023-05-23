import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, IsEmail, MaxLength, Matches, IsNotEmpty } from "class-validator";


export class CreateUserDto {


    @ApiProperty({
        description: 'First name of user',
        example: 'Christopher',
        nullable: false,
        minLength: 1,
    })
    @IsNotEmpty({
        message(validationArguments) {
            return `El nombre es requerido {{${validationArguments.property}}}`;
        },
    })
    @IsString({
        message(validationArguments) {
            return `El nombre debe ser un string {{${validationArguments.property}}}`;
        },
    })
    @MinLength(1, {
        message(validationArguments) {
            return `El nombre debe contener minimo 1 caracter {{${validationArguments.property}}}`;
        },
    })
    name: string;

    @ApiProperty({
        description: 'Last name of user',
        nullable: false,
        example: 'Nolan',
        minLength: 1,
    })
    @IsNotEmpty({
        message(validationArguments) {
            return `El apellido es requerido {{${validationArguments.property}}}`;
        },
    })
    @IsString({
        message(validationArguments) {
            return `El apellido debe ser un string {{${validationArguments.property}}}`;
        },
    })
    @MinLength(1, {
        message(validationArguments) {
            return `El apellido debe contener minimo 1 caracter {{${validationArguments.property}}}`;
        },
    })
    lastName: string;


    @ApiProperty({
        description: 'Username of user',
        nullable: false,
        example: 'chrisnol007'
    })
    @IsNotEmpty({
        message(validationArguments) {
            return `El nombre de usuario es requerido {{${validationArguments.property}}}`;
        },
    })
    @IsString({
        message(validationArguments) {
            return `El nombre de usuario debe ser un string {{${validationArguments.property}}}`;
        },
    })
    userName: string;

    @ApiProperty({
        description: 'Email of user',
        example: 'email@gmail.com | email@hotmail.com | email@yahoo.com | ect@etc.com',
        nullable: false,
    })
    @IsNotEmpty({
        message(validationArguments) {
            return `El email es requerido {{${validationArguments.property}}}`;
        },
    })
    @IsString({
        message(validationArguments) {
            return `El email debe ser un string {{${validationArguments.property}}}`;
        },
    })
    @IsEmail(undefined, {
        message(validationArguments) {
            return `El email no es válido {{${validationArguments.property}}}`;
        },
    })
    email: string;

    @ApiProperty({
        description: 'Password account',
        example: 'MMai0Or2PGvdd50s4UU5',
        nullable: false,
        minimum: 6,
        maximum: 50
    })
    @IsNotEmpty({
        message(validationArguments) {
            return `La contraseña es requerida {{${validationArguments.property}}}`;
        },
    })
    @IsString({
        message(validationArguments) {
            return `La contraseña debe ser un string {{${validationArguments.property}}}`;
        },
    })
    @MinLength(6, {
        message(validationArguments) {
            return `La contraseña debe tener minimo 6 caracteres {{${validationArguments.property}}}`;
        },
    })
    @MaxLength(50, {
        message(validationArguments) {
            return `La contraseña debe tener máximo 50 caracteres {{${validationArguments.property}}}`;
        }
    })
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message(validationArguments) {
            return `La contraseña debe contener al menos Mayuscula, minuscula, letras y números {{${validationArguments.property}}}`;
        },
    })
    pass: string;

    @ApiProperty({
        description: 'Role tag of user',
        example: 'DEFAULT_ROLE | ADMIN_ROLE | AGENT_ROLE',
        nullable: false,
    })
    @IsNotEmpty({
        message(validationArguments) {
            return `El rol es requerido {{${validationArguments.property}}}`;
        },
    })
    @IsString({
        message(validationArguments) {
            return `El rol debe ser un string {{${validationArguments.property}}}`;
        },
    })
    rol: string;

}


