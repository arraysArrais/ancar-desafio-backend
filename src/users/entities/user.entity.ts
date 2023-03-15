import { Table, Column, Model, Unique, DataType, BeforeCreate, BeforeUpdate, HasMany, } from 'sequelize-typescript';
import { Questionario } from 'src/questionarios/entities/questionario.entity';
const bcrypt = require('bcrypt');

@Table({
    tableName: 'users'
})
export class User extends Model {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    nome: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    
    password: string;
    @BeforeCreate
    @BeforeUpdate
    static async hashPass(instance: User){
        const password = instance.getDataValue('password');
        instance.setDataValue('password', await bcrypt.hash(password, 10));
    }

    @Unique({name:'CPF_unico', msg:'O CPF deve ser único na tabela users'})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    cpf: string;

    @Unique({name:'email_unico', msg:'O Email deve ser único na tabela users'})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email: string;

    //relacionamento entre user x questionario
    //1 usuário pode ter n questionarios
    @HasMany(()=> Questionario)
    questionarios: Questionario[];
}