import { FC } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { BoardProps, ListItem } from "../../@types/common";
import styles from './Constructor.module.css';

import { useSelector } from "react-redux";
import adding from '../../assets/icons/adding.svg';
import pointer from '../../assets/icons/cursor-pointer.svg';
import underline from '../../assets/icons/underline.svg';
import { selectIsRuntime } from "../../redux/features/mode/modeSlice";
import { InitialState } from "../Calculator/Calculator";

type ExtraProps = {
    isDragging: boolean,
    setColumns: (columns: InitialState) => void,
    columns: InitialState
}

const getListStyle = (isDraggingOver: boolean, list: ListItem[]) => ({
    background: isDraggingOver && !list.length ? '#F0F9FF' : 'white',
    border: list.length ? '2px dashed transparent' : '2px dashed #C4C4C4',
    borderTop: list.length ? 'none' : '2px dashed #C4C4C4',
});

const getItemStyle = (isRuntime: boolean) => ({
    cursor: isRuntime ? `url(${pointer}) 10 10, auto` : 'drag'
})

const getPlaceholderStyle = (list: ListItem[]) => ({
    display: list.length ? 'none' : 'block'
});

const getDividerStyle = (transform: string | undefined, isDragging: boolean) => ({
    display: !isDragging || (isDragging && (transform)) ? 'none' : 'block'
});

const Constructor: FC<BoardProps & ExtraProps> = ({ col: { list, id }, isDragging, setColumns, columns }) => {
    const isRuntime = useSelector(selectIsRuntime);
    const onDoubleClick = (id: string) => {
        if (!isRuntime) {
            const col = { ...columns };
            col["list-1"].list.forEach(item => {
                if (item.id.includes(id)) {
                    item.id = id;
                }
            });
            col["list-2"].list.forEach((item, index) => {
                if (item.id === id) {
                    item.id = id;
                    col["list-2"].list.splice(index, 1);
                }
            });
            setColumns(col);
        }
    }
    return (
        <Droppable droppableId={id} key={id}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className={styles.construction}
                    style={getListStyle(snapshot.isDraggingOver, list)}>
                    {list.map((item, index) => (
                        <Draggable draggableId={item.id} index={index} key={item.id} isDragDisabled={isRuntime || item.id === 'Display'} >
                            {(provided) => {
                                return (
                                    <div style={getItemStyle(isRuntime)}>
                                        <div className={styles.item}
                                            onDoubleClick={() => onDoubleClick(item.id)}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            {item.component}
                                            <img className={styles.divider}
                                                style={getDividerStyle(provided.draggableProps.style?.transform, isDragging)}
                                                src={underline} alt="underline" />
                                        </div>
                                    </div>
                                )
                            }}
                        </Draggable>
                    )
                    )}
                    <div className={styles.content} style={getPlaceholderStyle(list)}>
                        <img className={styles.icon} src={adding} alt="adding" />
                        <div className={styles.attention}>Перетащите сюда</div>
                        <div className={styles.explanation}>любой элемент из левой панели</div>
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

export default Constructor;