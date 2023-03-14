import {Table, Column, Model} from 'sequelize-typescript';

@Table({
    tableName: 'users'
})
export class User extends Model{
    @Column
    nome:string;

    @Column
    senha:string;

    @Column
    cpf:string
}