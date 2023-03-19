import { BelongsTo, Column, DataType, DefaultScope, ForeignKey, HasMany, Model, Scopes, Table } from "sequelize-typescript";
import { Pergunta } from "src/perguntas/entities/pergunta.entity";
import { User } from "src/users/entities/user.entity";

// @DefaultScope(() => ({
//     include:Pergunta
//   }))

@Scopes(()=>({
    withPerguntas:{
        attributes:['id', 'name', 'description', 'userId', 'createdAt', 'updatedAt'],
        include: [Pergunta]
    }
}))
    @Scopes(()=>({
        onlyPerguntas:{
            attributes:{exclude:['id', 'name', 'description', 'userId', 'createdAt', 'updatedAt']},
            include: [Pergunta]
        }
    }))

@Table({
    tableName: 'questionario'
})
export class Questionario extends Model {
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
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description: string;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => Pergunta, {
        onDelete: 'CASCADE'
    })
    perguntas: Pergunta[];
}
