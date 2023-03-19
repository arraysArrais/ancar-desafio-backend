import { BelongsTo, Column, DataType, ForeignKey, Model, Table, HasMany } from "sequelize-typescript";
import { Questionario } from 'src/questionarios/entities/questionario.entity';
import { Resposta } from "src/respostas/entities/resposta.entity";

@Table({
    tableName: 'pergunta'
})

export class Pergunta extends Model{
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
    title: string;

    @ForeignKey(() => Questionario)
    @Column
    questionarioId: number;

    @BelongsTo(() => Questionario)
    questionario: Questionario;

    @HasMany(() => Resposta, {
        onDelete: 'CASCADE'
    })
    respostas: Resposta[];
}
