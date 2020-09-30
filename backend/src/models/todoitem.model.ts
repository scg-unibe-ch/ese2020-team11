import { Optional, Model, Sequelize, DataTypes } from 'sequelize';
import { TodoList } from './todolist.model';

export interface TodoItemAttributes {
    todoItemId: number;
    name: string;
    done: boolean;
    todoListId: number;
}

// tells sequelize that todoItemId is not a required field
export interface TodoItemCreationAttributes extends Optional<TodoItem, 'todoItemId'> { }


export class TodoItem extends Model<TodoItemAttributes, TodoItemCreationAttributes> implements TodoItemAttributes {
    todoItemId!: number;
    name!: string;
    done!: boolean;
    todoListId!: number;


    public static initialize(sequelize: Sequelize) { // definition for database
        TodoItem.init({
            todoItemId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            done: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            todoListId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        { sequelize, tableName: 'todoItems' }
        );

    }
    public static createAssociations() {
        TodoItem.belongsTo(TodoList, {
            targetKey: 'todoListId',
            as: 'todoList',
            onDelete: 'cascade',
            foreignKey: 'todoListId'
        });
    }

}
