import { FC, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { ListItem } from "../../@types/common";
import Constructor from "../Constructor/Constructor";
import Dashboard from "../Dashboard/Dashboard";
import Display from "../Display/Display";
import EqualSign from "../EqualSign/EqualSign";
import Modes from "../Modes/Modes";
import Numbers from "../Numbers/Numbers";
import Options from "../Options/Options";

import cursor from '../../assets/icons/cursor.svg';

import styles from "./Calculator.module.css";

const getCalcStyle = (isDragging: boolean) => ({
    cursor: isDragging ? `url(${cursor}) 10 10, auto` : 'default'
})

const Calculator: FC = () => {
    const initialColumns = {
        'list-1': {
            id: 'list-1',
            list: [
                { id: 'Display', component: <Display /> },
                { id: 'Options', component: <Options /> },
                { id: 'Numbers', component: <Numbers /> },
                { id: 'EqualSign', component: <EqualSign /> }
            ]
        },
        'list-2': {
            id: 'list-2',
            list: []
        }
    }

    const [columns, setColumns] = useState(initialColumns);
    const [isDragging, setIsDragging] = useState(false);

    const onDragStart = () => {
        setIsDragging(true);
        return null;
    }

    const onDragEnd = ({ source, destination }: DropResult) => {
        setIsDragging(false);

        // Make sure we have a valid destination
        if (destination === undefined || destination === null) return null

        // Make sure we're actually moving the item
        if (
            source.droppableId === destination.droppableId &&
            destination.index === source.index
        ) return null

        // Set start and end variables
        const start = columns[source.droppableId as keyof typeof initialColumns]
        const end = columns[destination.droppableId as keyof typeof initialColumns]

        // If start is the same as end, we're in the same column
        if (start === end) {
            // Move the item within the list
            // Start by making a new list without the dragged item
            const newList = start.list.filter(
                (_: any, idx: number) => idx !== source.index
            )

            // Then insert the item at the right location
            newList.splice(destination.index, 0, start.list[source.index])

            // Then create a new copy of the column object
            const newCol = {
                id: start.id,
                list: newList
            }

            // Update the state
            setColumns(state => ({ ...state, [newCol.id]: newCol }))
            return null
        } else {
            // If start is different from end, we need to update multiple columns
            // Filter the start list like before
            const newStartList = start.list.map(
                (item: ListItem, idx: number) => {
                    if (idx === source.index) {
                        item.id += '-copy'
                    }
                    return item;
                }
            )

            // Create a new start column
            const newStartCol = {
                id: start.id,
                list: newStartList
            }

            // Make a new end list array
            const newEndList = end.list

            // Make a new pasted element into the end column
            let newPastedElement = {
                id: start.list[source.index].id.split('-')[0],
                component: start.list[source.index].component
            }

            // Insert the item into the end list
            newEndList.splice(destination.index, 0, newPastedElement)

            // Create a new end column
            const newEndCol = {
                id: end.id,
                list: newEndList
            }

            // Update the state
            setColumns(state => ({
                ...state,
                [newStartCol.id]: newStartCol,
                [newEndCol.id]: newEndCol
            }))
            return null
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <div className={styles.wrapper} style={getCalcStyle(isDragging)}>
                <div className={styles.calculator}>
                    <Modes />
                    {Object.values(columns).map(col => (
                        col.id === "list-1"
                            ? <Dashboard col={col} key={col.id} />
                            : <Constructor isDragging={isDragging} col={col} key={col.id} />
                    ))}
                </div>
            </div>
        </DragDropContext>
    )
}

export default Calculator;

