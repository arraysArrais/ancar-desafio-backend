import { Table, Column, Model, Unique, DataType, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
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
    
    senha: string;
    @BeforeCreate
    @BeforeUpdate
    static async hashPass(instance: User){
        const senha = instance.getDataValue('senha');
        const salt: any = await bcrypt.genSalt(10);
        instance.setDataValue('senha', await bcrypt.hash(senha, salt));
    }

    @Unique({name:'CPF_unico', msg:'O CPF deve ser único na tabela users'})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    cpf: string;
}