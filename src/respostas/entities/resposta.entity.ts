import { BelongsTo, Column, DataType, DefaultScope, ForeignKey, HasMany, Model, Scopes, Table } from "sequelize-typescript";
import { Pergunta } from "src/perguntas/entities/pergunta.entity";

// @DefaultScope(() => ({
//     attributes: ['id', 'name', 'perguntaId', 'createdAt', 'updatedAt'],
//     include:Pergunta
//   }))

@Table({
    tableName: 'resposta'
})

export class Resposta extends Model{
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

    @ForeignKey(() => Pergunta)
    perguntaId: number;

    @BelongsTo(() => Pergunta)
    pergunta: Pergunta;

}
