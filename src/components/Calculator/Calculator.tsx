import { FC, useEffect, useState } from "react";
import { DragDropContext, DragUpdate, DropResult } from "react-beautiful-dnd";
import { ListItem } from "../../@types/common";
import Constructor from "../Constructor/Constructor";
import Dashboard from "../Dashboard/Dashboard";
import Display from "../Display/Display";
import EqualSign from "../EqualSign/EqualSign";
import Modes from "../Modes/Modes";
import Numbers from "../Numbers/Numbers";
import Options from "../Options/Options";

import { useSelector } from "react-redux";
import move from '../../assets/icons/cursor-move.svg';
import { selectIsRuntime } from "../../redux/features/mode/modeSlice";
import styles from "./Calculator.module.css";

export type InitialState = {
    'list-1': BoardType,
    'list-2': BoardType
}

type BoardType = {
    id: string;
    list: ListItem[];
};

const getCalcStyle = (isDragging: boolean) => ({
    cursor: isDragging ? `url(${move}) 10 10, auto` : 'default'
})

const Calculator: FC = () => {
    const initialColumns: InitialState = {
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

    const isRuntime = useSelector(selectIsRuntime);
    const [columns, setColumns] = useState(initialColumns);
    const [isDragging, setIsDragging] = useState(false);
    const [destinationItem, setDestinationItem] = useState<null | number>(null);

    useEffect(() => {
        if (!isRuntime) {
            setColumns(initialColumns);
        }
    }, [isRuntime])

    const onDragStart = () => {
        setIsDragging(true);
        return null;
    }

    const onDragUpdate = ({ destination }: DragUpdate) => {
        if (destination?.index) {
            setDestinationItem(destination?.index);
        }
        return null;
    }

    const onDragEnd = ({ source, destination }: DropResult) => {
        setIsDragging(false);

        // Make sure we have a valid destination
        if (destination === undefined || destination === null) return null;

        // Make sure we're actually moving the item
        if (source.droppableId === destination.droppableId &&
            destination.index === source.index) return null;

        // Set start and end variables
        const start = columns[source.droppableId as keyof typeof initialColumns];
        const end = columns[destination.droppableId as keyof typeof initialColumns];

        // If start is the same as end, we're in the same column
        if (start === end) {
            // Move the item within the list
            // Start by making a new list without the dragged item
            const newList = start.list.filter(
                (_: ListItem, idx: number) => idx !== source.index
            )

            // Then insert the item at the right location
            newList.splice(destination.index, 0, start.list[source.index]);

            const compare = (a: ListItem, b: ListItem) => {
                let flag = 0;
                if (a.id === 'Display') flag = -1;
                if (b.id === 'Display') flag = 1;
                return flag;
            }

            // Then create a new copy of the column object
            const newCol = {
                id: start.id,
                list: newList.sort(compare)
            }

            // Update the state
            setColumns(state => ({ ...state, [newCol.id]: newCol }))
            return null;
        } else {
            // If start is different from end, we need to update multiple columns
            // Filter the start list like before
            const newStartList = start.list.map(
                (item: ListItem, idx: number) => {
                    if (idx === source.index) {
                        item.id += '-copy';
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
            const newEndList = end.list;

            // Make a new pasted element into the end column
            let newPastedElement = {
                id: start.list[source.index].id.split('-')[0],
                component: start.list[source.index].component
            }

            // Insert the item into the end list
            newEndList.splice(destination.index, 0, newPastedElement);

            const compare = (a: ListItem, b: ListItem) => {
                let flag = 0;
                if (a.id === 'Display') flag = -1;
                if (b.id === 'Display') flag = 1;
                return flag;
            }

            // Create a new end column
            const newEndCol = {
                id: end.id,
                list: newEndList.sort(compare)
            }

            // Update the state
            setColumns(state => ({
                ...state,
                [newStartCol.id]: newStartCol,
                [newEndCol.id]: newEndCol
            }))
            return null;
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart} onDragUpdate={onDragUpdate}>
            <div className={styles.wrapper} style={getCalcStyle(isDragging)}>
                <div className={styles.calculator}>
                    <Modes columns={columns} />
                    {Object.values(columns).map(col => (
                        (col.id === "list-1" && !isRuntime)
                            ? <Dashboard col={col} key={col.id} />
                            : <Constructor isDragging={isDragging}
                                columns={columns} destinationItem={destinationItem}
                                setColumns={setColumns} col={col} key={col.id} />
                    ))}
                </div>
            </div>
        </DragDropContext>
    )
}

export default Calculator;

